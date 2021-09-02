
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
   
        const x = inputs;
        const y = outputs;
        
        var done = false;            
        var epoca = 0;
        let x2 = [];
        var sumaError = 0;
        while(done === false){
            done = true;
            //Epocas

            for(var j = 0; j<x.length; j++){
                this.error = y[j] - this.predict(x[j]);

                sumaError += this.error;
                if(this.error!=0){
                    done = false;

                    this.w[0] += this.learningRate * this.error;
                    for(let k=0;  k< x[j].length; k++){                                                

                        this.w[k+1] += this.learningRate * this.error * x[j][k];

                    }
                    x2[0] = this.calcularX2(-5);
                    x2[1] = this.calcularX2(5);

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
