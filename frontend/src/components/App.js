import React, { useState } from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Perceptron from '../pages/Perceptron';
import {PerceptronContext} from '../components/PerceptronContext';
import PerceptronA from '../hooks/Perceptron.js';

function App() { 
  const [perceptronState, setPerceptronState] = useState({
    perceptron : null,
    entrenado: false,
    x : [],
    y : [],    
    cpDrawer: null,
    limiteAlcanzado: false
  });

 
  return (
    <div className="App">
      <PerceptronContext.Provider value = {{
          perceptronState, 
          setPerceptronState
      }}>
        <Header />

        <Perceptron />

        <Footer />
      </PerceptronContext.Provider>
      
      
    </div>
  );
}

export default App;
