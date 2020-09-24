import { fireEvent } from "@testing-library/react";

class  Perceptron {
  
    constructor(size, learningRate, iterations){
		this.w  = [];
		this.lr = learningRate || 0.01;
        this.it = iterations || 10;
            
        
        for(var i = 0; i<size+1; i++){
            this.w[i] = Math.random() * (5 - (-5)) + (-5);
        }        
        console.log(this.w);  
	}

   
    fit = (x,y) =>{
    
        console.log(this.w);  
        var done = false;    
        var error = 0;
        var epoca = 0;
        while(!done || epoca<this.iterations){
            done = true;
            //Epocas
            console.log("Epoca: ", epoca +1);
            for(var j = 0; j<x.length;j++){
                error = y[j] - this.predict(x[j]);
                console.log("error: ", error);
                if(error !==0){
                    done = false;
                    this.w[j] += this.learningRate  * error * this.x[j];
                }
            }    
        }

    }

    predict = (inputs) => {
        var activation = 0;
            for(var i = 0; i < inputs.length; i++){
                activation += this.w[i+1] * inputs[i];
            }
            return activation >= 0 ? 1 : 0;
        }

    
}
export default Perceptron;