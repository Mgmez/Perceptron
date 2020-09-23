const  Perceptron = class{

    
    constructor(inputs,outputs,learningRate){
            this.w = []
            this.lr = learningRate || 0.01;
                   
            this.x = inputs || [
                [5, 3],
                [4, 1],
                [3, 2],
                [3, 3]
            ];
            this.y = outputs || [0,0,1,1];
            
            for(var i = 0; i<this.x.length; i++){
                this.w[i] = Math.random();
            }
            console.log(this.w);            
    }

 fit (){   
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
export default Perceptron;