import React, {useContext} from 'react';
import { PerceptronContext } from "./PerceptronContext.js";

const Alert = (props) => {
    const {perceptronState} = useContext(PerceptronContext);

    return <>
        <div>                        
            <span className="error">{"Número de epocas: "}</span>
        </div>        
        <div>                        
            <span className="error">{perceptronState.perceptron.errorAcumulado.length}</span>
        </div>
    </>

}


export default Alert;