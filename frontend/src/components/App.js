import React, { useState } from 'react';
import '../App.css';
import Perceptron from '../hoocks/Perceptron';
//import usePerceptron from '../hoocks/usePerceptron';

function App() { 

  const [salida, setSalida ]= useState("");
  var perceptron;
  

  const iniciarPesos = () =>{
     perceptron = new Perceptron(4, 0.01, 30);
  }
  const entrenar = () =>{
    perceptron.fit();
    console.log("xdxd");

    console.log(perceptron.w);
  }
  const probar = () =>{
    const x = [[3, 3]];
    setSalida(perceptron.predict(x));
  }

  return (
    <div className="App">
      <header className="App-header">        
        <p>Perceptrón </p>

        <input type="submit" value="INiciar" onClick  = {iniciarPesos}/>
        
        <input type="submit" value="Entenar" onClick  = {entrenar}/>

        <input type="submit" value="Probar" onClick  = {probar}/>
        <a >{salida}</a>
      </header>
    </div>
  );
}

export default App;
