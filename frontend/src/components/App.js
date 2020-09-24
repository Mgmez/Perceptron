import React, { useState } from 'react';
import '../App.css';
import Perceptron from '../hoocks/Perceptron';
//import usePerceptron from '../hoocks/usePerceptron';

function App() { 

  const [salida, setSalida ]= useState("");
  const [perceptron, setPerceptron] = useState(null);
  

  const iniciarPesos = () =>{
     setPerceptron( new Perceptron(4, 0.01, 1000));
  }
  const entrenar = () =>{
    perceptron.fit();
    console.log(perceptron.w);
  }
  const probar = () =>{
    const x = [4, 1, 3];
    const xd = perceptron.predict(x);
    console.log("Salida perceptron :", xd);
    setSalida(xd);
    
  }

  return (
    <div className="App">
      <header className="App-header">        
        <p>Perceptrón </p>

        <input type="submit" value="Iniciar" onClick  = {iniciarPesos}/>
        
        <input type="submit" value="Entenar" onClick  = {entrenar}/>

        <input type="submit" value="Probar" onClick  = {probar}/>
        <a >{salida}</a>
      </header>
    </div>
  );
}

export default App;
