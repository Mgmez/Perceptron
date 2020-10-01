class Both {
    constructor(size, it, error, lr, cp){
        this.estado = cp;
        this.wPerceptron  = [];		
        this.wAdaline  = [];		
        this.learningRate = parseFloat(lr);
        this.iterations =  parseFloat(it) || 100;
        this.ecm = parseFloat(error); //Error cuadratico medio
        this.errorAcumulado = []; 
        this.errorAcumuladoPerceptron = [];
        for(var i = 0; i<size+1  ; i++){
            this.wPerceptron[i] = Math.random() * (5 - (-5)) + (-5);
            this.wAdaline[i] = Math.random() * (5 - (-5)) + (-5);
        }
    }

    fit = async (inputs, outputs) =>{                      
        let epoca = 0;
        let x2 = [];
        let sumaError = 0;
        let sumaErrorPerceptron = 0;
        let errorLineal = 0;
        let errorCuadratico = 0;        
        let y = 0;
        let errorCuadraticoMedio = 5;
        let donePerceptron = true;
        let perceptronError = 0;
        
        while(errorCuadraticoMedio >= this.ecm || donePerceptron){           
            console.log("Epoca: ", epoca+1);
            donePerceptron = true;

            if (errorCuadraticoMedio >= this.ecm) {
                for(var j = 0; j<inputs.length; j++){
                    //const d = outputs[j]  >= 0 ? 0.5 : -0.5;    
                    y = this.predict(inputs[j]);
                    errorLineal = outputs[j] - this.f(y);
                    errorCuadratico =  Math.pow(errorLineal,2);
                    sumaError += errorCuadratico; 
                    for(let k=0;  k< inputs[j].length; k++){                                                                    
                       this.wAdaline[k+1] += (this.learningRate * errorLineal * this.f(y)* (1- this.f(y))* inputs[j][k]);                   
                    }
                }
            }

            if (!donePerceptron) {
                for(var j = 0; j<inputs.length; j++){
                    perceptronError = outputs[j] - this.predictPerceptron(inputs[j]);
                    sumaErrorPerceptron += perceptronError;

                    if(perceptronError){
                        donePerceptron = false;
                        this.wPerceptron[0] += this.learningRate * perceptronError;
                        for(let k=0;  k< inputs[j].length; k++){                                                
                            this.wPerceptron[k+1] += this.learningRate * perceptronError * inputs[j][k];
                        }
                    }
                }
            }

            x2[0] = this.calcularX2(-5);
            x2[1] = this.calcularX2(5);
                
            this.estado.clearCanvas();
            this.estado.drawAxis();
            inputs.forEach ((point, index) => {
                this.estado.drawPoint(this.estado.XC(point[0]), this.estado.YC(point[1]), outputs[index])    
            });          
            this.estado.drawLine(-5,x2[0],5,x2[1], "#FF0040");
            x2[0] = this.calcularX2Perceptron(-5);
            x2[1] = this.calcularX2Perceptron(5);
            console.log("LineaPerceptron")
            this.estado.drawLine(-5,x2[0],5,x2[1], "#00FF40");
            await new Promise(r => setTimeout(r, 30));
            
            errorCuadraticoMedio = sumaError / inputs.length;
            
            console.log("ECM: ", errorCuadraticoMedio);
            console.log("ECMTolerado: ", this.ecm);
            console.log("ECMCacalculado >= ECMUSARIo: ", errorCuadraticoMedio >= this.ecm);
            this.errorAcumulado.push({epoca: "Ep "+ parseFloat(epoca + 1), error: sumaError});
            this.errorAcumuladoPerceptron.push({epoca: "Ep "+ parseInt(epoca + 1), error: perceptronError});
            epoca += 1;
            sumaError = 0;
            sumaErrorPerceptron = 0;

            if(donePerceptron) {
                console.log("Perceptron terminó en epoca", epoca + 1)
            }
            
            if(epoca >=this.iterations){
                break;
            }
            console.log("Termina epoca");
        }
        console.log("termina entrenamiento");
    }
    f = (y) =>{
        const ye = y * -1; 
        return  1/(1+(Math.pow(Math.E, ye)));
    }
    
    calcularX2 = (x1) =>{
        return  ((-this.wAdaline[1] *  x1) + this.wAdaline[0] )/ this.wAdaline[2];
    }
    calcularX2Perceptron = (x1) => {
        return  ((-this.wPerceptron[1] *  x1) + this.wPerceptron[0] )/ this.wPerceptron[2];
    }
    
        predict = (inputs) => {
            let suma = -this.wAdaline[0];         
            for(var i = 0; i < inputs.length; i++){
                suma += this.wAdaline[i+1] * inputs[i];               
            }
            return suma;
            // const activation = suma  >= 0 ? 0.5 : -0.5;      
            // return activation;
            
        }
        //Para las clases una vez este entrenado 
        predict2 = (inputs) => {
            let suma = -this.wAdaline[0];         
            for(var i = 0; i < inputs.length; i++){
                suma += this.wAdaline[i+1] * inputs[i];               
            }            
            const activation = suma  >= 0 ? 1 : 0;      
            return activation;
            
        }

        predictPerceptron = (inputs) => {
            let suma = -this.wPerceptron[0];         
            for(var i = 0; i < inputs.length; i++){
                suma += this.wPerceptron[i+1] * inputs[i];               
            }            
            const activation = suma  >= 0 ? 1 : 0;      
            return activation;   
        }
      


}

export default Both;