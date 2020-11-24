class BackPropagation {
    constructor(layersCount, layersNeuronsCount, learningRate, maxErrorAllowed, maxEpicNumber, cpDrawer, setPerceptronState){
        console.log("data: ",layersCount, layersNeuronsCount, learningRate, maxErrorAllowed, maxEpicNumber)
        this.layers = [];
        this.learningRate = learningRate;
        this.maxErrorAllowed = maxErrorAllowed;
        this.maxEpicNumber = maxEpicNumber;
        this.meanError = [];
        this.initLayers(layersCount, layersNeuronsCount)
        this.cpDrawer = cpDrawer;
        this.setPerceptronState = setPerceptronState
    }

    initLayers(layersCount, layersNeuronsCount) {
        for (let i = 0; i < layersCount; i++){
            this.layers.push([]);
        }
        this.layers.forEach((layer, index) => {
            for(let i = 0; i < layersNeuronsCount[index]; i++) {
                const count =  index === 0 
                ? 2
                :  this.layers[index-1].length;
                const weights = []
                for (let j = 0; j <= count; j++){
                    weights.push(Math.random() * (5 - (-5)) + (-5));
                }
                layer.push(weights);
            }
        })
    }

    fit = async (inputs, outputs) => {
        let accumulatedSquareError, meanSquareError, epicNumber = 0;
        meanSquareError = 999999;
        //Detener el algoritmo hasta llegar al error deseado o se alcanza el número máximo de épocas
        while(epicNumber < this.maxEpicNumber && meanSquareError > this.maxErrorAllowed) {
            accumulatedSquareError = 0;
            inputs.forEach((inputData, indexInput) => {
                const { sensitivity, net, a } = this.initFitData();

                //Obtener salidas de cada capa (forward)
                this.forward(inputData, net, a);
                
                //Calcular el error
                const error = [];
                outputs[indexInput].forEach((output, index) => {
                    error[index] = output - a[a.length-1][index];
                });
                const squareSum = error.reduce((accumulator, value) => {
                    return accumulator + Math.pow(value,2);
                }, 0);
                accumulatedSquareError += Math.sqrt(squareSum);
                
                //Back-propagation (backward)
                this.backward(sensitivity, inputData, net, a, error);
            });
            epicNumber++;
            meanSquareError = accumulatedSquareError / inputs.length;
            this.meanError.push({epoca: "Ep "+ parseFloat(epicNumber), error: meanSquareError});
            console.log("Epoca", epicNumber);
            console.log("Error", meanSquareError);
            // console.log("Error mínimo", this.maxErrorAllowed);
            // console.log("pesos", this.layers)
            if(epicNumber % 25 === 0){
                await this.drawCanvas(inputs, outputs);
            }
        }
        this.setPerceptronState(state => {
            return {
                ...state,
                meanError: this.meanError
            }
        });
    }
    
    forward = (inputData, net, a) => {
        this.layers.forEach((layer, indexLayer) => {
            layer.forEach((neuron, indexNeuron) => {
                const input = (indexLayer === 0) ? inputData : a[indexLayer - 1];
                net[indexLayer][indexNeuron] = -neuron[0];
                for (let i = 0; i < input.length; i++) {
                    net[indexLayer][indexNeuron] += neuron[i+1] * input[i];
                }
                a[indexLayer][indexNeuron] = this.f(net[indexLayer][indexNeuron]);
            });
        });
    }
    
    backward = (sensitivity, inputData, net, a, error) => {
        //Calcular sensibilidades
        this.calculateSensitivities(sensitivity, net, error);
        //Adaptar pesos
        this.weightsUpdate(sensitivity, inputData, a);
    }

    calculateSensitivities = (sensitivity, net, error) => {
        for(let i = this.layers.length-1; i >=0; i--) {
            if (i === this.layers.length-1) { //adaline neuronas de salida ultima capa
                this.layers[i].forEach((neuron, j) => {
                    sensitivity[i][j] = -2 * this.fp(net[i][j]) * error[j];
                });
            } else { //Se calcula la sensibilidad con base en la sensibilidad de la capa siguiente
                this.layers[i].forEach((neuron, j) => {
                    let sum = 0;
                    this.layers[i+1].forEach((neuron, k) => {
                        sum += this.fp(net[i][j]) * neuron[j+1] * sensitivity[i+1][k];
                    });
                    sensitivity[i][j] = sum;
                });
            }
        }
    }

    weightsUpdate = (sensitivity, inputData, a) => {
        for(let i = this.layers.length-1; i >=0; i--) { //Recorrer capas
            const inputTemp = (i === 0) ? inputData : a[i-1];
            const input = JSON.parse(JSON.stringify(inputTemp));
            input.unshift(-1);

            this.layers[i].forEach((neuron, index) => { //Recorrer neuronas
                neuron.forEach((weight, j) => {
                    neuron[j] = weight - (this.learningRate * sensitivity[i][index] * input[j]);
                });
            });
        }
    }

    initFitData = () => {
        const sensitivity =[];
        const net = [];
        const a = [];
        for (let i = 0; i < this.layers.length; i++) { //Capa
            sensitivity.push([]);
            net.push([]);
            a.push([]);
        }
        return { sensitivity, net, a };
    }

    f = (y) =>{
        const ye = y * -1; 
        return  1/(1+(Math.pow(Math.E, ye)));
    }

    fp = (y) => {
        //Derivada en términos de f(y), para la función log-sig solamente
        return this.f(y) * (1-this.f(y));
    }

    calcularX2 = (w, x1) =>{
        return  ((-w[1] *  x1) + w[0] )/ w[2];
    }

    transferencia = (inputs) => {
    }

    //Para las clases una vez este entrenado
    predict = (inputs) => {
        const { a, net } = this.initFitData();
        this.layers.forEach((layer, indexLayer) => {
            layer.forEach((neuron, indexNeuron) => {
                const input = (indexLayer === 0) ? inputs : a[indexLayer - 1];
                net[indexLayer][indexNeuron] = -neuron[0];
                for (let i = 0; i < input.length; i++) {
                    net[indexLayer][indexNeuron] += neuron[i+1] * input[i];
                }
                a[indexLayer][indexNeuron] = this.f(net[indexLayer][indexNeuron]);
            });
        });
        return a[a.length-1];
    }

    async drawCanvas(inputs, outputs) {
        this.cpDrawer.clearCanvas();
        this.cpDrawer.drawBarrido(this);
        this.cpDrawer.drawAxis();
            inputs.forEach ((point, index) => {
                let output = outputs[index].indexOf(1);
                this.cpDrawer.drawPoint(this.cpDrawer.XC(point[0]), this.cpDrawer.YC(point[1]), output);
            });
            this.setPerceptronState(state => {
            return {
                ...state,
                meanError: this.meanError
            }
        });
        await new Promise(r => setTimeout(r, 10));
    }
}

export default BackPropagation;

// [
//     [               //capa
//         [1, 2, 5 ],
//         [1, 2, 3 ]
//     ],
//     [],
//     []
// ]