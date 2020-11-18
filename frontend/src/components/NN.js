import React, { useEffect, useRef, useState, useContext } from "react";
import { PerceptronContext } from "./PerceptronContext";
import AppendingLineChart from '../utils/LineChart'
import * as d3 from 'react-d3-library';
import Tree from 'react-tree-graph';
import ForceGraph3D from '3d-force-graph';

let lineChart;
let data2 = {    
    name: 'Parent2',
    name: 'Parent',
    children: [{
        name: 'Child One'
    }, 
    {
        name: 'Child Two'
    },
    {
        name: 'Child 3'
    }]
};

let data = {
    "name": "Eve",
    "children": [
      {
        "name": "Cain"
      },
      {
        "name": "Seth",
        "children": [
          {
            "name": "Enos"
          },
          {
            "name": "Noam"
          }
        ]
      },
      {
        "name": "Abel"
      },
      {
        "name": "Awan",
        "children": [
          {
            "name": "Enoch"
          }
        ]
      },
      {
        "name": "Azura"
      }
    ]
  };
const NN = () => {
    const { perceptronState, setPerceptronState } = useContext(PerceptronContext);
    const canvasRef = useRef(null)
    var myGraph = ForceGraph3D();
    

    useEffect(() => {
        canvasRef.current.style.width = "auto";
        myGraph(document.getElementById('linechart'))
        //.jsonUrl('../utils/miserables.json')
        .nodeLabel('id')
        .nodeAutoColorBy('group');
        //  cpDrawer = new CPDrawer(canvasRef.current, perceptronState.clases)
        // lineChart = new AppendingLineChart(canvasRef,["#777", "black"]);
        /*setPerceptronState({
            ...perceptronState,
            cpDrawer: cpDrawer
        })*/

        //cpDrawer.drawAxis();

    }, [])

    return (
      
    /*    <Tree
	    data={data}
            height={200}
            width={400}
            nodeShape="rect"
            nodeProps={{ rx: 2 }}/>)*/
        <canvas
            id="linechart"
            style={{ border: "1px solid #d1d1d1" }}
         //   onClick={handleClick}
           // onContextMenu={handleClick}
            width={500}
            height={500}
            ref={canvasRef}
        ></canvas>)

      
}
export default NN;