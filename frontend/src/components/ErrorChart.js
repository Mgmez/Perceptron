import React,{useContext, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { PerceptronContext } from "./PerceptronContext";
const ErrorChart = (props) =>  {
    const {perceptronState} = useContext(PerceptronContext);  
    return <>
          { perceptronState.entrenado &&
          <ResponsiveContainer>
            <LineChart 
              data={perceptronState.perceptron.errorAcumulado} 
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >          
              <Line type="monotone" dataKey="error" stroke="#1976d2" activeDot={{ r: 8 }}/>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="epoca" interval={0} angle={60} dx={20}/>
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>
          </ResponsiveContainer>
        }
    </>
}

export default ErrorChart;