import React, {Component} from "react";
import { Container, Row, Col } from 'react-bootstrap';

import CartesianPlane from '../components/CartesianPlane';
import PerceptronConfigs from '../components/PerceptronConfigs';
import ErrorChart from '../components/ErrorChart';

class Perceptron extends Component {
    render() {
        return (
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
                <Row>
                    <Col sm={{span: 12}}>
                        <div className="card card--box">
                            <div className="card__header">
                                Grafica
                            </div>
                            <ErrorChart />
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Perceptron;