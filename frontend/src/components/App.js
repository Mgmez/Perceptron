import React, { useState } from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Perceptron from '../pages/Perceptron';
import PerceptronA from '../hooks/Perceptron';
//import usePerceptron from '../hoocks/usePerceptron';

function App() { 

  const [salida, setSalida ]= useState("");
  const [perceptron, setPerceptron] = useState(null);
  

  const iniciarPesos = () =>{
     setPerceptron( new PerceptronA(4, 0.01, 1000));
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
      <Header />

      <Perceptron />
      <p>Perceptrón </p>

      <input type="submit" value="Iniciar" onClick  = {iniciarPesos}/>

      <input type="submit" value="Entenar" onClick  = {entrenar}/>

      <input type="submit" value="Probar" onClick  = {probar}/>

      <Footer />
      
    </div>
  );
}

export default App;
