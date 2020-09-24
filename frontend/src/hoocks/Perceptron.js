

class  Perceptron {
  
    constructor(size, lr, it){
		this.w  = [];
		this.learningRate=  lr || 0.01;
        this.iterations =  it || 10;
            
        
        for(var i = 0; i<size+1  ; i++){
            this.w[i] = Math.random() * (5 - (-5)) + (-5);
        }
        console.log(this.w);
	}

   

    fit = (inputs, outputs) =>{
   
        const x = inputs || [
            [5, 3, 2],
            [4, 1, 3],
            [3, 2, 3],
            [3, 3, 3]
        ];
        const y = outputs || [0,0,1,1];

    
        var done = false;    
        var error = 0;
        var epoca = 0;
        

        while(done === false){
            done = true;
            //Epocas
            console.log("Epoca: ", epoca+1);
            for(var j = 0; j<x.length; j++){
                error = y[j] - this.predict(x[j]);
                console.log("error: ", error);
                if(error!=0){
                    done = false;
                    this.w[j] += this.learningRate  * error * x[j];
                }
            }
            epoca += 1;   
            if(epoca >=5){
                break;
            } 
        }

    }

    predict = (inputs) => {
            let activation = 0;
            console.log("x[j]: ", inputs);
            console.log("Pesos ", this.w);
            for(var i = 0; i < inputs.length; i++){
                activation += this.w[i+1] * inputs[i];
            }
            const k = activation  >= 0 ? 1 : 0;
            return k;
            
        }

    
}
export default Perceptron;