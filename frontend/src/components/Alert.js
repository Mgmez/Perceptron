import React, {useContext} from 'react';
import { PerceptronContext } from "./PerceptronContext.js";

const Alert = (props) => {
    const {perceptronState} = useContext(PerceptronContext);

    return <>
        {
            (!perceptronState.limiteAlcanzado ) &&
            <div>
                <span className="error">{"Entrenamiento Perceptron  finalizado"}</span>
            </div>
        }
        <div>
            <span className="error">{"Número de epocas perceptron: "}</span>
        </div>
        <div>
            <span className="error">{perceptronState.perceptron?.errorAcumulado?.length}</span>
        </div>
        {
            (!perceptronState.limiteAlcanzadoAdaline && perceptronState.adalineEntrenado) &&
            <div>
                <span className="error">{"Entrenamiento Adaline finalizado"}</span>
            </div>
        }
        {(perceptronState.entrenado && perceptronState.adaline) &&
        <div>
            <span className="error">{"Número de epocas Adaline: "}</span>
        </div>}
        <div>
            <span className="error">{perceptronState.entrenado && perceptronState.adaline?.errorAcumulado?.length}</span>
        </div>

        {
            (perceptronState.limiteAlcanzado || perceptronState.limiteAlcanzadoAdaline) &&
            <div>                        
                <span className="error">{"Limite de epocas alcanzado"}</span>
            </div>    
        }
    </>

}


export default Alert;