import React, { useState } from 'react';
import '../App.css';
import Perceptron from '../hoocks/Perceptron';
//import usePerceptron from '../hoocks/usePerceptron';

function App() { 

  
  const perceptron = new Perceptron(10);

  return (
    <div className="App">
      <header className="App-header">        
        <p>Perceptrón </p>

        <input type="submit" value="Submit" onClick  = {perceptron.fit}/>

      </header>
    </div>
  );
}

export default App;
