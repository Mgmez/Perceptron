import React, { useEffect, useRef, useState, useContext} from "react";
import { PerceptronContext } from "./PerceptronContext";
import AppendingLineChart from '../utils/LineChart'
import * as d3 from 'react-d3-library';

let lineChart;

const NN = () => {
    const {perceptronState, setPerceptronState} = useContext(PerceptronContext);
    const canvasRef = useRef(null)


    useEffect(() => {
        canvasRef.current.style.width = "auto";
      //  cpDrawer = new CPDrawer(canvasRef.current, perceptronState.clases)
       // lineChart = new AppendingLineChart(canvasRef,["#777", "black"]);
        /*setPerceptronState({
            ...perceptronState,
            cpDrawer: cpDrawer
        })*/

        //cpDrawer.drawAxis();
        
    }, [])

    return (
        <canvas
            id="linechart"
            style={{ border: "1px solid #d1d1d1" }}
         //   onClick={handleClick}
           // onContextMenu={handleClick}
            width={500}
            height={500}
            ref={canvasRef}
        ></canvas>
    )
}
export default NN;