import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import {ModalContainer} from "./style";

export default class ServiceCard extends Component {
    render() {
        const {style, origin, destination, vehicle, freight} = this.props;
        return (
            <ModalContainer>
                <Card style={ style }>
                    <Row>
                        <Col span={12}>
                            <Row>
                                <h1>De</h1>
                            </Row>
                            <Row>
                                <p>{origin}</p>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <h1>De</h1>
                            </Row>
                            <Row>
                                <p>{destination}</p>
                            </Row>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={12}>
                            <Row>
                                <h1>Vehículo</h1>
                            </Row>
                            <Row>
                                <p>{vehicle}</p>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <h1>Flete</h1>
                            </Row>
                            <Row>
                                <p>{freight}</p>
                            </Row>
                        </Col>

                    </Row>
                </Card>
            </ModalContainer>

        );
    }
}
