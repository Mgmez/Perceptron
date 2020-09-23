import React from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Perceptron from '../pages/Perceptron';

function App() {
  return (
    <div className="App">
      <Header />

      <Perceptron />

      <Footer />
      
    </div>
  );
}

export default App;
