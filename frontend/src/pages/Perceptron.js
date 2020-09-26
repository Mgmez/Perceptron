import React, {useContext, useState, Component} from "react";
import { Container, Row, Col } from 'react-bootstrap';

import CartesianPlane from '../components/CartesianPlane';
import PerceptronConfigs from '../components/PerceptronConfigs';
import ErrorChart from '../components/ErrorChart';
import { PerceptronContext } from "../components/PerceptronContext";

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
                            <div style={{ width: '100%', height: 400 }}>
                                <ErrorChart />
                            </div>
                        </div>
                    </Col>
                </Row>
            }
        </Container>
    </>
}

export default Perceptron;