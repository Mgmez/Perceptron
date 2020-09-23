import { useState, useEffect } from 'react';



const usePerceptron = (props) =>{
    const [w, setW] = useState([]);
   
    fit () => {   
        var done = false;
        var error = 0;
        console.log(this.x);
    /*    while(!done){
            done = true;
            for(var j = 0; j< this.x.length;j++){
    
                error = this.y[j] - this.predict(this.x[j]);
                console.log("error: ", error);
    
                if(error !==0){
                    done = false;
                    //this.w[j] += this.learningRate  * error * this.x;
                }
            }    
        }*/
    
    }
    
        predict(inputs){
            var activation = this.w[0];
            for(var i = 0; i < inputs.length; i++){
                activation += this.w[i+1] * inputs[i];
            }
            return activation >= 0 ? 1 : 0;
        }
    


}

export default usePerceptron;