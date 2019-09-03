import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Checkbox} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Select, Input} from 'antd';
import {putRateService, getUsers, getServices} from '../../../../helpers/api/adminCalls.js';
import {getRateService, getRateServices} from "../../../../helpers/api/adminCalls";


const {Option} = Select;


export default class RateServiceEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getRateService(this.props.match.params.id), getUsers(), getServices()])
            .then((responses) => {
                this.setState({
                    users: responses[1].data,
                    services: responses[2].data,
                    service_point: responses[0].data.service_point,
                    driver_point: responses[0].data.driver_point,
                    point: responses[0].data.point,
                    service_id: responses[0].data.service_id,
                    user_id: responses[0].data.user_id,
                    driver_id: responses[0].data.driver_id,
                    active: responses[0].data.active
                });

            }).catch((error) => {
            console.error(error);
        });
    }

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    }

    handlePut() {


        putRateService(this.props.match.params.id,
            {
                "rate_service": {
                    "service_point": this.state.service_point,
                    "driver_point": this.state.driver_point,
                    "point": this.state.point,
                    "service_id": this.state.service_id,
                    "user_id": this.state.user_id,
                    "driver_id": this.state.driver_id,
                    "active": this.state.active
                }
            }).then(() => {
            this.setState({redirect: true})
        })
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

                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Form.Item label="Estado">
                                                <Select required value={this.state.active} placeholder="estado"
                                                        style={{width: 120}} onChange={(e) => {
                                                    this.handleChange(e, 'active')
                                                }}>
                                                    <Option value={true}>Activo</Option>
                                                    <Option value={false}>Desactivado</Option>

                                                </Select>
                                            </Form.Item>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col span={24}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <PrimaryButton htmlType={"submit"} message_id={"general.edit"}
                                                               style={{width: '200px'}}
                                                               onClick={() => this.handlePut()}/>
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
