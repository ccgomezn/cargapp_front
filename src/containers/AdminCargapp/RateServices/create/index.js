import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Input, Card, Select, Checkbox} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {postRateService} from '../../../../helpers/api/adminCalls.js';
import {getUsers, getServices} from "../../../../helpers/api/adminCalls";


const {Option} = Select;

export default class RateServiceCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getServices(), getUsers()])
            .then((responses) => {
                this.setState({
                    services: responses[0].data,
                    users: responses[1].data
                });

            })

    }

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    }

    handlePost() {


        postRateService(
            {
                "rate_service": {
                    "service_point": this.state.service_point,
                    "driver_point": this.state.driver_point,
                    "point": this.state.point,
                    "service_id": this.state.service_id,
                    "user_id": this.state.user_id,
                    "driver_id": this.state.driver_id,
                    "active": true
                }
            }
        ).then(
            () => {
                this
                    .setState({redirect: true})
            }
        )
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/rate_services'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="rateServices.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Puntos de servicio">
                                                <Input type={"number"} value={this.state.service_point}
                                                       placeholder="puntos de servicio"
                                                       onChange={(e) => this.handleChange(e.target.value, 'service_point')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Puntos de conductor">
                                                <Input type={"number"} value={this.state.driver_point}
                                                       placeholder="puntos de conductor"
                                                       onChange={(e) => this.handleChange(e.target.value, 'driver_point')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Puntos">
                                                <Input type={"number"} value={this.state.point}
                                                       placeholder="puntos"
                                                       onChange={(e) => this.handleChange(e.target.value, 'point')}
                                                       required/>
                                            </Form.Item>
                                        </Col>

                                    </Row>




                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Usuario">
                                                <Select value={this.state.user_id} placeholder="usuario"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'user_id')
                                                }}>
                                                    {this.state && this.state.users &&

                                                    this.state.users.map((item) => {
                                                        return <Option value={item.id}>{item.email}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Servicio">
                                                <Select value={this.state.service_id} placeholder="servicio"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'service_id')
                                                }}>
                                                    {this.state && this.state.services &&

                                                    this.state.services.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Conductor">
                                                <Select value={this.state.driver_id} placeholder="conductor"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'driver_id')
                                                }}>
                                                    {this.state && this.state.users &&

                                                    this.state.users.map((item) => {
                                                        return <Option value={item.id}>{item.email}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <PrimaryButton htmlType={"submit"} message_id={"general.add"}
                                                               style={{width: '200px'}}
                                                               onClick={() => this.handlePost()}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>


                        </Row>

                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}
