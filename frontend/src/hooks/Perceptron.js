import React, {useContext} from 'react';
import {  PerceptronContext} from "../components/PerceptronContext";

class  Perceptron {
      
    constructor(size, lr, it, cp){

        this.estado = cp;
		this.w  = [];
		this.learningRate= parseFloat(lr) || 0.01;
        this.iterations =  parseFloat(it) || 10;
        this.error = 0;
        this.errorAcumulado = [];        
        for(var i = 0; i<size+1  ; i++){
            this.w[i] = Math.random() * (5 - (-5)) + (-5);
        }        
       
	}
   

    fit = async (inputs, outputs) =>{
   
        const x = inputs || [
            [3.1, 3.123],
            [4.12, 1.12],
            [3.123, 2],
            [3, 3]
        ];
        const y = outputs || [0,0,1,1];
        
        var done = false;            
        var epoca = 0;
        let x2 = [];
        var sumaError = 0;
        while(done === false){
            done = true;
            //Epocas            
            console.log("Epoca: ", epoca+1);

            for(var j = 0; j<x.length; j++){
                this.error = y[j] - this.predict(x[j]);
                //console.log("Error: ",this.error );
                sumaError += this.error;
                if(this.error!=0){
                    done = false;
                    console.log("Ajustando w");
                    this.w[0] += this.learningRate * this.error;
                    for(let k=0;  k< x[j].length; k++){                                                
                        console.log("Antes del ajuste: w: %f, error: %d, xj", this.w[k+1],  this.error, x[j]);
                        this.w[k+1] += this.learningRate * this.error * x[j][k];
                        console.log("w %d Despues : %f ",k+1, this.w[k+1]);                        
                    }
                    x2[0] = this.calcularX2(-5);
                    x2[1] = this.calcularX2(5);
                    console.log("x2: ", x2);
                    console.log("w: ", this.w);
                 
                    this.estado.clearCanvas();
                    this.estado.drawAxis();
                    x.forEach ((point, index) => {
                        this.estado.drawPoint(this.estado.XC(point[0]), this.estado.YC(point[1]), y[index])    
                    })                    
                    this.estado.drawLine(-5,x2[0],5,x2[1], "#0101DF")
                    await new Promise(r => setTimeout(r, 30));
                    
                    
                }
            }
            this.errorAcumulado.push({epoca: "Ep "+ parseInt(epoca + 1), error: sumaError});
            epoca += 1;
            sumaError = 0;
            if(epoca >=this.iterations){
                break;
            }
        }

        return true;

    }

    calcularX2 = (x1) =>{
        return  ((-this.w[1] *  x1) + this.w[0] )/ this.w[2];
    }
    
    predict = (inputs) => {
            let suma = -this.w[0];         
            for(var i = 0; i < inputs.length; i++){
                suma += this.w[i+1] * inputs[i];               
            }
            
            const activation = suma  >= 0 ? 1 : 0;            
            return activation;
            
        }
      

        
          
}
export default Perceptron;