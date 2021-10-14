
import * as math from "mathjs";

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
                this.layers.forEach((layer, indexLayer) => {
                    //Obtener net (pesos * entradas) (multiplicación de matriz por vector = vector)
                    const inputTemp = (indexLayer === 0) ? inputData : a[indexLayer - 1];
                    const input = JSON.parse(JSON.stringify(inputTemp));
                    input.unshift(-1); //Agregar un -1 al vector de entradas en la posición 0 (umbral)
                    // console.log(`Capa ${indexLayer + 1}`, layer);
                    // console.log("Entrada", input);
                    net[indexLayer] = math.multiply(layer, input);
                    // console.log("Net", net[indexLayer]);
                    //Evaluar en función de activación (f(net))
                    for (let indexNeuron = 0; indexNeuron < net[indexLayer].length; indexNeuron++){
                        a[indexLayer][indexNeuron] = this.f(net[indexLayer][indexNeuron]);
                    }
                    // console.log("Salida", a[indexLayer]);
                });

                //Calcular el error
                // error = outputs[indexInput] - a[a.length-1]; //Deseada - obtenida (vector)
                const error = math.subtract(outputs[indexInput], a[a.length-1]);
                const squareSum = error.reduce((accumulator, value) => {
                    return accumulator + Math.pow(value,2);
                }, 0);
                accumulatedSquareError += Math.sqrt(squareSum);

                //Back-propagation (backward)
                //Calcular sensibilidades
                //Para las derivadas es vector de derivadas multiplicado por matriz identidad
                for(let i = this.layers.length-1; i >=0; i--) {
                    //Convertir (fp) a matriz diagonal
                    const diferential = [];
                    for(let j = 0; j < net[i].length; j++) {
                        diferential[j] = [];
                        for(let k = 0; k < net[i].length; k++) {
                            diferential[j][k] = (j === k) ? this.fp(net[i][j]) : 0;
                        }
                    }
                    if (i === this.layers.length-1) { //adaline neuronas de salida ultima capa
                        // -2 * f'(n[i]) (d-a)
                        sensitivity[i] = math.multiply(-2, diferential); //constnte * matriz = matriz
                        sensitivity[i] = math.multiply(sensitivity[i], error); //matriz * vector = vector
                    } else { //Se calcula la sensibilidad con base en la sensibilidad de la capa siguiente
                        //Los pesos de la capa siguiente (this.layers[i+1]) se deben transponer, ignorando el peso del umbral
                        const weights = JSON.parse(JSON.stringify(this.layers[i+1]));
                        weights.forEach(neuron => {
                            neuron.shift(); //Remover el peso del umbral
                        });

                        // f'(n[i]) * w[i+1]T * s[i+1]
                        // sensitivity[i] = diferential * math.transpose(weights) * sensitivity[i+1]
                        // console.log("diferencial", diferential.size());
                        sensitivity[i] = math.multiply(diferential, math.transpose(weights)); //matriz * matriz = matriz
                        sensitivity[i] = math.multiply(sensitivity[i], sensitivity[i+1]); //matriz * vector = vector
                    }
                }
                //Adaptar pesos
                for(let i = this.layers.length-1; i >=0; i--) { //Recorrer capas
                    // cambio de w =
                    const inputTemp = (i === 0) ? inputData : a[i-1];
                    const input = JSON.parse(JSON.stringify(inputTemp));
                    input.unshift(-1);

                    this.layers[i].forEach((neuron, index) => { //Recorrer neuronas
                        // console.log("Sensibilidad neurona", sensitivity[i][index]);
                        let weightChange = math.multiply(sensitivity[i][index], math.transpose(input));
                        // console.log("WeightChange", weightChange, this.learningRate)
                        weightChange = math.multiply(weightChange, this.learningRate);

                        for (let j = 0; j < neuron.length; j++) {
                            // console.log(neuron[j], weightChange);
                            neuron[j] -= weightChange[j];
                        }
                    });
                }
            });
            epicNumber++;
            meanSquareError = accumulatedSquareError / inputs.length;
            this.meanError.push({epoca: "Ep "+ parseFloat(epicNumber), error: meanSquareError});
            // console.log("Epoca", epicNumber);
            // console.log("Error", meanSquareError);
            // console.log("Error mínimo", this.maxErrorAllowed);
            // console.log("pesos", this.layers)
            if(epicNumber % 25 === 0){

                this.cpDrawer.clearCanvas();
                this.cpDrawer.drawBarrido(this);
                this.cpDrawer.drawAxis();
                //Dibujar lineas de la primer capa oculta
                // this.layers[1].forEach(neuron => {
                //     const y1 = this.calcularX2(neuron, -5);
                //     const y2 = this.calcularX2(neuron, 5);
                //     this.cpDrawer.drawLine(-5, y1, 5, y2);
                // });
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
        this.setPerceptronState(state => {
            return {
                ...state,
                meanError: this.meanError
            }
        });
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
            const input = (indexLayer === 0) ? inputs : a[indexLayer - 1];
            input.unshift(-1); //Agregar un -1 al vector de entradas en la posición 0 (umbral)
            //Obtener net (pesos * entradas) (multiplicación de matriz por vector = vector)
            net[indexLayer] = math.multiply(layer, input);

            //Evaluar en función de activación (f(net))
            for (let indexNeuron = 0; indexNeuron < net[indexLayer].length; indexNeuron++){
                a[indexLayer][indexNeuron] = this.f(net[indexLayer][indexNeuron]);
            }
        });
        return a[a.length-1];
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
