import React, { useState } from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Perceptron from '../pages/Perceptron';
import {PerceptronContext} from '../components/PerceptronContext';


function App() { 
  const [perceptronState, setPerceptronState] = useState({
    perceptron : null,
    entrenado: false,
    x : [],
    y : [],    
    cpDrawer: null,
    limiteAlcanzado: false, 
    claseSelect: "1",
    iniciado: false,
    meanError: []
  });

    return (
    <div className="App">
      <PerceptronContext.Provider value = {{
          perceptronState, 
          setPerceptronState
      }}>
        <Header />

        <Perceptron />


      </PerceptronContext.Provider>
    </div>
  );
}

export default App;
