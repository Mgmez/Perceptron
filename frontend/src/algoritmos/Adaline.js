class Adaline {
    constructor(size, it, error, lr, cp){
        this.estado = cp;
        this.w  = [];		
        this.learningRate = parseFloat(lr);
        this.iterations =  parseFloat(it) || 100;
        this.ecm = parseFloat(error); //Error cuadratico medio
        this.errorAcumulado = []; 
        for(var i = 0; i<size+1  ; i++){
            this.w[i] = Math.random() * (5 - (-5)) + (-5);
        }
    }

    fit = async (inputs, outputs) =>{                      
        let epoca = 0;
        let x2 = [];
        let sumaError = 0;
        let errorLineal = 0;
        let errorCuadratico = 0;        
        let y = 0;
        let errorCuadraticoMedio = 5;
        
        while(errorCuadraticoMedio >= this.ecm){           
            console.log("Epoca: ", epoca+1);
            for(var j = 0; j<inputs.length; j++){
                //const d = outputs[j]  >= 0 ? 0.5 : -0.5;    
                y = this.transferencia(inputs[j]);
                errorLineal = outputs[j] - this.f(y);
                errorCuadratico =  Math.pow(errorLineal,2);
                sumaError += errorCuadratico; 
                for(let k=0;  k< inputs[j].length; k++){                                                                    
                   this.w[k+1] += (this.learningRate * errorLineal * this.f(y)* (1- this.f(y))* inputs[j][k]);                   
                }                
            }

            x2[0] = this.calcularX2(-5);
            x2[1] = this.calcularX2(5);
                
            this.estado.clearCanvas();
            this.estado.drawAxis();
            inputs.forEach ((point, index) => {
                this.estado.drawPoint(this.estado.XC(point[0]), this.estado.YC(point[1]), outputs[index])                  
            });          
            this.estado.drawLine(-5,x2[0],5,x2[1], "#FF0040")
            await new Promise(r => setTimeout(r, 30));                                       
            
            errorCuadraticoMedio = sumaError / inputs.length;
            
            console.log("ECM: ", errorCuadraticoMedio);
            console.log("ECMTolerado: ", this.ecm);
            console.log("ECMCacalculado >= ECMUSARIo: ", errorCuadraticoMedio >= this.ecm);
            this.errorAcumulado.push({epoca: "Ep "+ parseFloat(epoca + 1), error: sumaError});
            epoca += 1;   
            sumaError = 0;     
            
            if(epoca >=this.iterations){
                break;
            }
        }
    }
    f = (y) =>{
        const ye = y * -1; 
        return  1/(1+(Math.pow(Math.E, ye)));
    }
    
    calcularX2 = (x1) =>{
        return  ((-this.w[1] *  x1) + this.w[0] )/ this.w[2];
    }
    
        transferencia = (inputs) => {
            let suma = -this.w[0];         
            for(var i = 0; i < inputs.length; i++){
                suma += this.w[i+1] * inputs[i];               
            }
            return suma;
            // const activation = suma  >= 0 ? 0.5 : -0.5;      
            // return activation;
            
        }
        //Para las clases una vez este entrenado 
        predict = (inputs) => {
            let suma = -this.w[0];         
            for(var i = 0; i < inputs.length; i++){
                suma += this.w[i+1] * inputs[i];               
            }            
            const activation = suma  >= 0 ? 1 : 0;      
            return activation;
            
        }
      


}

export default Adaline;