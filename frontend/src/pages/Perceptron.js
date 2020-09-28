import React, {useContext, useState, Component} from "react";
import { Container, Row, Col } from 'react-bootstrap';

import CartesianPlane from '../components/CartesianPlane';
import PerceptronConfigs from '../components/PerceptronConfigs';
import ErrorChart from '../components/ErrorChart';
import { PerceptronContext } from "../components/PerceptronContext";
import Alert from '../components/Alert.js';
const Perceptron = (props) => {
    const {perceptronState} = useContext(PerceptronContext); 
    return <>
        <Container fluid>
            
            <Row>
                <Col
                    md={{span: 7}}
                    sm={{span: 12}}
                >
                    <div className="card card--box">
                        <div className="card__header">
                            Plano cartesiano
                        </div>
                        <CartesianPlane />
                    </div>
                </Col>
                <Col 
                    md={{span: 5}}
                    sm={{span: 12}}
                >
                    <div className="card card--box">
                        <div className="card__header">
                            Configuraciones
                        </div>
                        <PerceptronConfigs />                       
                    </div>
                    {  
                        perceptronState.entrenado &&         
                        <Row>
                            <Col
                                md={{span: 12}}
                                sm={{span: 5}}
                                >
                                <div className="card card--box">
                                    
                                    <div style={{ width: '100%', height: 75 }}>
                                        <Alert />
                                    </div>
                                </div>
                            </Col>
                        </Row>                                                            
                    }
                </Col>
            </Row>
           
            {
                perceptronState.entrenado && 
                <Row>
                    <Col sm={{span: 12}}>
                        <div className="card card--box">
                            <div className="card__header">
                                Grafica
                            </div>
                            <div style={{ width: '100%', height: 500, paddingBottom: '11%'}}>
                                {
                                    perceptronState.perceptron.errorAcumulado != 0 && 
                                    <ErrorChart />
                                }
                                {
                                    perceptronState.perceptron.errorAcumulado == 0 && 
                                    <span>No hay información para mostrar</span>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            }
        </Container>
    </>
}

export default Perceptron;