import React, { useEffect, useRef, useState, useContext} from "react";
import { PerceptronContext } from "./PerceptronContext";

var widthCanvas, heightCanvas;

const CartesianPlane = (props) => {
    //const [trainingSet, setTrainingSet] = useState([]);
    const {perceptronState, setPerceptronState} = useContext(PerceptronContext);

    const canvasRef = useRef(null)

    const MAX_Y = 5, MAX_X = 5;
    const MIN_Y = -5, MIN_X = -5;
    
    useEffect(() => {
        canvasRef.current.style.width = "auto";
        widthCanvas = canvasRef.current.width;
        heightCanvas = canvasRef.current.height;

        let ctx = canvasRef.current.getContext("2d"),
            cty = canvasRef.current.getContext("2d");
            
        ctx.moveTo(widthCanvas/2,0);
        ctx.lineTo(widthCanvas/2,heightCanvas);
        ctx.stroke();

        cty.moveTo(0,heightCanvas/2);
        cty.lineTo(widthCanvas,heightCanvas/2);
        cty.stroke();


        ctx.font = "10px Arial";
        for (let i = MIN_X; i < MAX_X; i++) {
            if (i === 0) continue
            ctx.fillText(`${i}`, XC(i), YC(-0.2));
            ctx.fillText(`${i}`, XC(0.1), YC(i));
        }
        ctx.fillText(`${MAX_X}`, widthCanvas-10, YC(-0.2));
        ctx.fillText(`${MAX_Y}`, XC(0.1), 10);
    }, [])
    

    // Returns the physical x-coordinate of a logical x-coordinate:
    const XC = (x) => {
        return (x - MIN_X) / (MAX_X - MIN_X) * widthCanvas
    }

    // Returns the physical y-coordinate of a logical y-coordinate:
    const YC = (y) => {
        return heightCanvas - ((y - MIN_Y) * heightCanvas) / (MAX_Y - MIN_Y);
    }

    // Returns the logical x-coordinate of a physical x-coordinate:
    const XL = (x) => {
        return ((x * (MAX_X - MIN_X ) ) / widthCanvas)  + MIN_X
    }

    // Returns the logical y-coordinate of a physical y-coordinate:
    const YL = (y) => {
        return MAX_Y - (y *  (MAX_Y - MIN_Y)) / heightCanvas;
    }
    
    const handleClick = (event) => {
        event.preventDefault();
        
        const canvas = canvasRef.current,
            rect = canvas.getBoundingClientRect(),
            ctx = canvas.getContext("2d"),
            physicalXCoordinate = event.clientX - rect.left,
            physicalYCoordinate = event.clientY - rect.top,
            logicalXCoordinate = XL(physicalXCoordinate),
            logicalYCoordinate = YL(physicalYCoordinate)

        if(event.type === "click"){
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(physicalXCoordinate-2,physicalYCoordinate-2,4,4); //cuadrito
        } else {
            ctx.fillStyle = "#0000FF";
            ctx.beginPath(); 
            ctx.arc(physicalXCoordinate-1.25,physicalYCoordinate-1.25,2.5,0,2*Math.PI);//circulito
            ctx.stroke();
        }/*
        setTrainingSet([
            ...trainingSet,
            {
                x: physicalXCoordinate,
                y: physicalYCoordinate,
                value: event.type === "click" ? 1 : 0
            }
        ])*/
        setPerceptronState( {
            perceptron: perceptronState.perceptron,
            entrenado: perceptronState.entrenado,
            x: [
                ...perceptronState.x,
                {
                    x: physicalXCoordinate,
                    y: physicalYCoordinate,
                    bias: Math.random() * (5 - (-5)) + (-5),                     
                }
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