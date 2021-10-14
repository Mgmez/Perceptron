
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
        cpDrawer = new CPDrawer(canvasRef.current, perceptronState.clases)
        setPerceptronState({
            ...perceptronState,
            cpDrawer: cpDrawer
        })

        cpDrawer.drawAxis();

    }, [])


    const handleClick = (event) => {
        event.preventDefault();
        const entrenado = perceptronState.entrenado;
        const clase = perceptronState.claseSelect;
        const canvas = canvasRef.current,
            rect = canvas.getBoundingClientRect(),
            physicalXCoordinate = event.clientX - rect.left,
            physicalYCoordinate = event.clientY - rect.top,
            logicalXCoordinate = cpDrawer.XL(physicalXCoordinate),
            logicalYCoordinate = cpDrawer.YL(physicalYCoordinate),
            value = [];
            for (let i = 0; i < perceptronState.clases.length; i++) {
                value[i] = (i == clase - 1) ? 1 : 0;
            }

        if(!entrenado){
            cpDrawer.drawPoint(physicalXCoordinate, physicalYCoordinate, clase-1);
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
