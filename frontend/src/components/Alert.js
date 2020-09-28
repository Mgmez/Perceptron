import React, {useContext} from 'react';
import { PerceptronContext } from "./PerceptronContext.js";

const Alert = (props) => {
    const {perceptronState} = useContext(PerceptronContext);
    console.log("alert limite: ", perceptronState.limiteAlcanzado);
    return <>
        {
            !perceptronState.limiteAlcanzado &&
            <div>                        
                <span className="error">{"Entrenamiento finalizado"}</span>
            </div>                
        }   
        
        <div>                        
            <span className="error">{"Número de epocas: "}</span>
        </div>        
        <div>                        
            <span className="error">{perceptronState.perceptron.errorAcumulado.length}</span>
        </div>
        {
            perceptronState.limiteAlcanzado &&
            <div>                        
                <span className="error">{"No se encontró un hiperplano que los separe"}</span>
            </div>    
        }
    </>

}


export default Alert;