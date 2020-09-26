import React,{useContext, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { PerceptronContext } from "./PerceptronContext";
const ErrorChart = (props) =>  {

    const {perceptronState} = useContext(PerceptronContext);  
    return <>
          { perceptronState.entrenado &&
          <LineChart width={600} height={300} data={perceptronState.perceptron.errorAcumulado}>          
            <Line type="monotone" dataKey="error" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="epoca" />
              <YAxis />
          </LineChart>
        }
    </>
}

export default ErrorChart;