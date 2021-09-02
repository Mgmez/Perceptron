import React, {useContext, useState, Component} from "react";
import {Container, Row, Col} from 'react-bootstrap';

import CartesianPlane from '../components/CartesianPlane';
import PerceptronConfigs from '../components/PerceptronConfigs';
import ErrorChart from '../components/ErrorChart';
import {PerceptronContext} from "../components/PerceptronContext";
import Alert from '../components/Alert.js';

const Perceptron = (props) => {
    const {perceptronState} = useContext(PerceptronContext);
    return <>
        <Container fluid>

            <Row >
                <Col
                    md={{span: 2}}
                    sm={{span: 2}}
                >
                    <div className="">
                        <span >
                            Parametros
                        </span>
                        <PerceptronConfigs/>
                    </div>
                    {
                        perceptronState.entrenado &&
                        <Row>
                            <Col
                                md={{span: 12}}
                                sm={{span: 5}}
                            >
                                <div className="card card--box">

                                    <div style={{width: '100%', height: 75}}>
                                        <Alert/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    }
                </Col>

                <Col
                    md={{span: 4}}
                    sm={{span: 4}}
                >

                    <CartesianPlane/>
                </Col>


                {
                    perceptronState.entrenado &&


                    <Col sm={{span: 6}}>
                        <div className="card card--box">
                            <span >
                                Grafica
                            </span>
                            <div style={{width: '100%', height: 500, paddingBottom: '11%'}}>
                                {
                                    perceptronState.perceptron.errorAcumulado != 0 &&
                                    <ErrorChart/>
                                }
                                {
                                    perceptronState.perceptron.errorAcumulado == 0 &&
                                    <span>No hay información para mostrar</span>
                                }
                            </div>
                        </div>
                    </Col>

                }
            </Row>


        </Container>
    </>
}

export default Perceptron;