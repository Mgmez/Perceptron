import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import Perceptron from '../hoocks/Perceptron';


function App() {


  const perceptron = new Perceptron();
  
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
