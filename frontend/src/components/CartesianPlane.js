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

        cpDrawer.drawAxis();
        
    }, [])
    
    
    const handleClick = (event) => {
        event.preventDefault();
        
        const canvas = canvasRef.current,
            rect = canvas.getBoundingClientRect(),
            physicalXCoordinate = event.clientX - rect.left,
            physicalYCoordinate = event.clientY - rect.top,
            logicalXCoordinate = cpDrawer.XL(physicalXCoordinate),
            logicalYCoordinate = cpDrawer.YL(physicalYCoordinate),
            value = event.type === "click" ? 1 : 0;

        cpDrawer.drawPoint(physicalXCoordinate, physicalYCoordinate, value);

        setPerceptronState( {
            perceptron: perceptronState.perceptron,
            entrenado: perceptronState.entrenado,
            x: [
                ...perceptronState.x,
                [
                    logicalXCoordinate,
                    logicalYCoordinate,
                    Math.random() * (5 - (-5)) + (-5)
                ]
            ],
            y: [
                ...perceptronState.y,
                event.type === "click" ? 1 : 0                
            ]
        });
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