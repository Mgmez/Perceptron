class BackPropagation {
    constructor(layersCount, layersNeuronsCount, learningRate, maxErrorAllowed, maxEpicNumber){
        this.layers = [];
        this.learningRate = learningRate;
        this.maxErrorAllowed = maxErrorAllowed;
        this.maxEpicNumber = maxEpicNumber;
        initLayers(layersCount, layersNeuronsCount)
    }

    initLayers(layersCount, layersNeuronsCount) {
        for (let i = 0; i < layersCount; i++){
            this.layers.push([]);
        }
        this.layers.forEach((layer, index) => {
            for(let i = 0; i < layersNeuronsCount[index]; i++) {
                layer.push([]);
                const count =  layer === 0 
                    ? 2
                    :  this.layers[index-1].length;
                for (let j = 0; j < count; j++){
                    layer[j].push(Math.random() * (5 - (-5)) + (-5));
                }
            }
        })
    }

    fit = async (inputs, outputs) => {
        const sensibility =[[]]; //Inicializar dinámicamente
        const net = [[]]; //Inicializar dinámicamente
        const a = [[]]; //Inicializar dinámicamente

        inputs.forEach((inputData, indexInput) => {
            //Obtener salidas de cada capa (forward)
            this.layers.forEach((layer, indexLayer) => {
                //Agregar un -1 al vector de entradas en la posición 0 (threshold)
                //Obtener net (pesos * entradas) (multiplicación de matriz por vector = vector)
                if (indexLayer === 0) {
                    //inputData * neuron.weights
                } else {
                    //a[indexLayer - 1] * neuron.weights
                }

                for (let indexNeuron = 0; i < layer.length; i++){
                    //Evaluar en función de activación (f(net))
                    a[indexLayer][indexNeuron] = f(net[indexLayer][indexNeuron]);
                }
            });
    
            //Calcular el error
            const error = outputs[indexInput] - a[a.length]; //Deseada - obtenida (vector)
    
            //Back-propagation (backward)
            //Calcular sensibilidades
            //Para las derivadas es vector de derivadas multiplicado por matriz identidad
            for(let i = this.layers.length-1; i >=0; i--) {
                if (i === this.layers.length-1) {
                    sensibility[i] = -2 * this.f(net[net.length]) * (error)
                    //adaline
                } else {
                    //Se calcula la sensibilidad con base en la sensibilidad de la capa siguiente
                }
            }
            //Adaptar pesos
            for(let i = this.layers.length-1; i >=0; i--) {
                
            }
        });
        //Detener el algoritmo hasta llegar al error deseado
    }

    initNet = async () => {
        const w = [];
        for (let i = 0; i < inputs.length; i++) { //Capa
            w.push([])
            for (let j = 0; j < this.layers[i].length; j++) {
                w[i].push(this.layers[i][j].weights[i] * inputs[i]);
            }
        }
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
    }
}

export default BackPropagation;

// [
//     [               //capa
//         [
//             [5, 2, 5 ],
//             [1, 2, 3 ]
//         ],
//     ],
//     [],
//     []
// ]