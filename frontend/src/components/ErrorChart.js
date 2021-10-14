
import React,{useContext, useEffect, useState } from "react";
import { Button, TextField } from '@material-ui/core';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,  } from 'recharts';
import { PerceptronContext } from "./PerceptronContext";

const MAX_ELEMENTS_TO_SHOW = 50;

const ErrorChart = (props) =>  {
    const {perceptronState} = useContext(PerceptronContext);
    let [dataToShow, setDataToShow] = useState([]);
    let [itemsViewed, setItemsViewed] = useState(0);
    let [infoGrouped, setInfoGrouped] = useState([]);


    useEffect(() => {
      const tempInfoGrouped = groupElements(perceptronState.meanError)
      setInfoGrouped(tempInfoGrouped);
      let firstDataToShow = groupElements(perceptronState.meanError);
      setDataToShow(firstDataToShow[firstDataToShow.length > 1 ? firstDataToShow.length-2 : 0].data);
      setItemsViewed(tempInfoGrouped.length);
    }, [perceptronState.meanError.length]);

    /*const getHarcodedInfo = () => {
      let data = [];
      for(let i = 0; i < 33; i++){
        data.push({'epoca': i+1, 'error': Math.floor(Math.random() * (20 - 1)) + 1})
      }
      return data;
    }*/

    const groupElements = (data) => {
      let infoGrouped = [{'index': 0, 'data': []}],
        objectIndex = 0,
        insertedElements = 1;
      for(let i = 0; i < data.length; i++){
        if(insertedElements == MAX_ELEMENTS_TO_SHOW){
          infoGrouped[objectIndex].data.push(data[i])
          objectIndex++;
          infoGrouped.push({'index': objectIndex, 'data': []})
          insertedElements = 1;
          continue
        } else {
          infoGrouped[objectIndex].data.push(data[i])
        }

        insertedElements++;
      }
      return infoGrouped;
    }

    const nextData = () => {
      setItemsViewed(itemsViewed == infoGrouped.length ? infoGrouped.length: ++itemsViewed)
      if(itemsViewed < infoGrouped.length){
        setDataToShow(infoGrouped[itemsViewed].data);
      }
    }

    const afterData = () => {
      setItemsViewed(itemsViewed == 0 ? 0: --itemsViewed)
      if(itemsViewed < infoGrouped.length){
        setDataToShow(infoGrouped[itemsViewed].data);
      }
    }

    return <>
        <Button onClick={() => afterData()} className="m-4"  variant="contained" color="primary">Anteriores {MAX_ELEMENTS_TO_SHOW}</Button>
        <Button  onClick={() => nextData()} className="m-4"  variant="contained" color="primary">Siguientes {MAX_ELEMENTS_TO_SHOW}</Button>
        <br></br>
        <span>Mostrando un total de {perceptronState.meanError.length}</span>
        <ResponsiveContainer>
          <LineChart
            //data={perceptronState.meanError}
            data={dataToShow}
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
    </>
}

export default ErrorChart;
