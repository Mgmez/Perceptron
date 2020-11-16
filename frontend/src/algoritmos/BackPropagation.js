import * as math from "mathjs";

class BackPropagation {
    constructor(layersCount, layersNeuronsCount, learningRate, maxErrorAllowed, maxEpicNumber){
        console.log("data: ",layersCount, layersNeuronsCount, learningRate, maxErrorAllowed, maxEpicNumber)
        this.layers = [];
        this.learningRate = learningRate;
        this.maxErrorAllowed = maxErrorAllowed;
        this.maxEpicNumber = maxEpicNumber;
        this.errorAcumulado = [];
        this.initLayers(layersCount, layersNeuronsCount)
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
        console.log("Entra a la función");
        const { sensibility, net, a } = this.initFitData();
        let accumulatedSquareError, meanSquareError, epicNumber = 0;
        meanSquareError = 999999;
        console.log("a", a);
        //Detener el algoritmo hasta llegar al error deseado o se alcanza el número máximo de épocas
        while(epicNumber < this.maxEpicNumber && meanSquareError > this.maxErrorAllowed) {
            inputs.forEach((inputData, indexInput) => {
                //Obtener salidas de cada capa (forward)
                this.layers.forEach((layer, indexLayer) => {
                    //Obtener net (pesos * entradas) (multiplicación de matriz por vector = vector)
                    const input = (indexLayer === 0) ? inputData : a[indexLayer - 1];
                    input.unshift(-1); //Agregar un -1 al vector de entradas en la posición 0 (umbral)
                    // console.log("Capa", layer)
                    // console.log("Entrada", input)
                    net[indexLayer] = math.multiply(layer, input);
    
                    //Evaluar en función de activación (f(net))
                    for (let indexNeuron = 0; indexNeuron < net[indexLayer].length; indexNeuron++){
                        a[indexLayer][indexNeuron] = this.f(net[indexLayer][indexNeuron]);
                    }
                });
                
                //Calcular el error
                // error = outputs[indexInput] - a[a.length]; //Deseada - obtenida (vector)
                console.log("salidas", outputs, a);
                const error = math.subtract(outputs[indexInput], a[a.length]);
                console.log("error: ", error);
                const squareSum = error.reduce((finalValue, value) => {
                    finalValue += value**2;
                    return finalValue;
                });
                accumulatedSquareError += Math.sqrt(squareSum);
        
                //Back-propagation (backward)
                //Calcular sensibilidades
                //Para las derivadas es vector de derivadas multiplicado por matriz identidad
                for(let i = this.layers.length-1; i >=0; i--) {
                    //Convertir (1-this.f(net[i])) (fp) a matriz diagonal
                    const fp = [];
                    net[i].forEach((neuron, index) => {
                        fp[index] = (1-this.f(neuron));
                    });
                    const diagonalMatrix = math.identity(fp.length);
                    const diferential = math.multiply(diagonalMatrix, fp);
                    if (i === this.layers.length-1) { //adaline neuronas de salida ultima capa
                        // -2 * f'(n[i]) (d-a)
                        // sensibility[i] = diferential * math.transpose(weights) * sensibility[i+1]
                        sensibility[i] = math.multiply(-2, diferential); //constnte * matriz = matriz
                        sensibility[i] = math.multiply(sensibility[i], error); //matriz * vector = vector
                    } else { //Se calcula la sensibilidad con base en la sensibilidad de la capa siguiente
                        //Los pesos de la capa siguiente (this.layers[i+1]) se deben transponer, ignorando el peso del umbral
                        const weights = math.matrix(this.layers[i+1]);
                        weights.forEach(neuron => {
                            neuron.shift(); //Remover el peso del umbral
                        });
                        
                        // f'(n[i]) * w[i+1]T * s[i+1]
                        // sensibility[i] = diferential * math.transpose(weights) * sensibility[i+1]
                        sensibility[i] = math.multiply(diferential, math.transpose(weights)); //matriz * matriz = matriz
                        sensibility[i] = math.multiply(sensibility[i], sensibility[i+1]); //matriz * vector = vector
                    }
                }
                //Adaptar pesos
                for(let i = this.layers.length-1; i >=0; i--) {
                    const input = (i === 0) ? inputData : a[i-1];
                    let wChange = math.multiply(sensibility[i], math.transpose(input));
                    wChange = wChange * this.learningRate;
                    
                    this.layers[i].forEach(neuron => {
                        neuron.forEach(weigth => {
                            weigth += wChange;
                        });
                    });
                }
            });
            epicNumber++;
            meanSquareError = accumulatedSquareError / inputs.length;
        }
    }

    initFitData = () => {
        const sensibility =[];
        const net = [];
        const a = [];
        for (let i = 0; i < this.layers.length; i++) { //Capa
            sensibility.push([]);
            net.push([]);
            a.push([]);
        }
        console.log(sensibility, net, a)
        return ({
            sensibility,
            net,
            a
        });
    }

    f = (y) =>{
        const ye = y * -1; 
        return  1/(1+(Math.pow(Math.E, ye)));
    }

    calcularX2 = (x1) =>{
    }

    transferencia = (inputs) => {
    }

    //Para las clases una vez este entrenado
    predict = (inputs) => {
        const { a, net } = this.initFitData();
        this.layers.forEach((layer, indexLayer) => {
            //Obtener net (pesos * entradas) (multiplicación de matriz por vector = vector)
            const input = (indexLayer === 0) ? inputs : a[indexLayer - 1];
            input.unshift(-1); //Agregar un -1 al vector de entradas en la posición 0 (umbral)
            net[indexLayer] = math.multiply(layer, input);

            //Evaluar en función de activación (f(net))
            for (let indexNeuron = 0; indexNeuron < net[indexLayer].length; indexNeuron++){
                a[indexLayer][indexNeuron] = this.f(net[indexLayer][indexNeuron]);
            }
        });
        return a[a.length];
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