import { useState, useEffect, useReducer } from 'react';



const usePerceptron = (props) =>{
    const [w, setW] = useState([]);
    const [x, setX] = useState([]);
    const [y, setY] = useState([]);



    const fit = () => {   
        var done = false;
        var error = 0;
        console.log(x);
        while(!done){
            done = true;
            for(var j = 0; j< x.length; j++){
    
                error = y[j] - predict(x[j]);
                console.log("error: ", error);
    
                if(error !==0){
                    done = false;
                    w[j] += props.learningRate  * error * x[j];
                }
            }    
        }
    
    }
    
        const predict = (inputs) =>{
            var activation = this.w[0];
            for(var i = 0; i < inputs.length; i++){
                activation += this.w[i+1] * inputs[i];
            }
            return activation >= 0 ? 1 : 0;
        }
    


}

export default usePerceptron;