import React, { useEffect, useRef, useState, useContext} from "react";
import { PerceptronContext } from "./PerceptronContext";
import CPDrawer from "../utils/CPDrawer";

let cpDrawer;

const CartesianPlane = (props) => {
    //const [trainingSet, setTrainingSet] = useState([]);
    const {perceptronState, setPerceptronState} = useContext(PerceptronContext);

    const canvasRef = useRef(null)
    
    useEffect(() => {
        canvasRef.current.style.width = "auto";
        cpDrawer = new CPDrawer(canvasRef.current)
        setPerceptronState({
            ...perceptronState,
            cpDrawer: cpDrawer
        })

        cpDrawer.drawAxis();
        
    }, [])
    
    
    const handleClick = (event) => {
        event.preventDefault();
        const entrenado = perceptronState.entrenado;
        const canvas = canvasRef.current,
            rect = canvas.getBoundingClientRect(),
            physicalXCoordinate = event.clientX - rect.left,
            physicalYCoordinate = event.clientY - rect.top,
            logicalXCoordinate = cpDrawer.XL(physicalXCoordinate),
            logicalYCoordinate = cpDrawer.YL(physicalYCoordinate),
            value = event.type === "click" ? 1 : 0;

        if(!entrenado){
            cpDrawer.drawPoint(physicalXCoordinate, physicalYCoordinate, value);
            setPerceptronState({            
                ...perceptronState,
                x: [
                    ...perceptronState.x,
                    [
                        logicalXCoordinate,
                        logicalYCoordinate
                    ]
                ],
                y: [
                    ...perceptronState.y,
                    value
                ]
            });
        }else{
            cpDrawer.drawPoint(
                physicalXCoordinate, 
                physicalYCoordinate, 
                perceptronState.perceptron.predict([
                    logicalXCoordinate, 
                    logicalYCoordinate                                        
                ]));
        }
        

        
    }

    return <>
        <canvas
            id="cartesian_plane"
            style={{border: "1px solid #d1d1d1"}}
            onClick={handleClick}
            onContextMenu={handleClick}
            width={500}
            height={500}
            ref={canvasRef}
        ></canvas>
    </>
}

export default CartesianPlane;