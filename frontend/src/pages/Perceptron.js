import React, { useContext, useState, Component } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import CartesianPlane from '../components/CartesianPlane';
import PerceptronConfigs from '../components/PerceptronConfigs';
import ErrorChart from '../components/ErrorChart';
import { PerceptronContext } from "../components/PerceptronContext";
import Alert from '../components/Alert.js';
import NN from '../components/NN';


const Perceptron = (props) => {
    const {perceptronState} = useContext(PerceptronContext);
    const meanError = perceptronState?.perceptron?.meanError;
    return <>
        <Container fluid>
            <Row>
                <Col
                    md={{ span: 7 }}
                    sm={{ span: 12 }}
                >
                    <div className="card card--box">
                        <div className="card__header">
                            Plano cartesiano
                        </div>
                        {
                            perceptronState.iniciado &&
                            <CartesianPlane />
                        }
                    </div>
                </Col>
                <Col
                    md={{ span: 5 }}
                    sm={{ span: 12 }}
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
                                md={{ span: 12 }}
                                sm={{ span: 5 }}
                            >
                                <div className="card card--box">
                                    <div style={{ width: '100%', height: "auto" }}>
                                        <Alert />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>

            {
                perceptronState.iniciado &&
                <NN />
            }
            <Row>
                <Col sm={{span: 12}}>
                    <div className="card card--box">
                        <div className="card__header">
                            Grafica
                        </div>
                        {
                            perceptronState.perceptron &&
                            <div style={{ width: '100%', height: 500, paddingBottom: '11%'}}>
                                {
                                    (!!meanError.length && !perceptronState.entrenado) &&
                                    <>
                                        <div>
                                            <span>{`Número de epoca actual: ${meanError.length}`}</span>
                                        </div>
                                        <div>
                                            <span>{`Error actual: ${meanError[meanError.length-1].error}`}</span>
                                        </div>
                                    </>
                                }
                                <ErrorChart />
                                {
                                    perceptronState.perceptron.errorAcumulado == 0 &&
                                    <span>No hay información para mostrar</span>
                                }
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </Container>
    </>
}

export default Perceptron;