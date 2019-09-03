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
import {putServiceLocation, getUsers, getCities, getServices} from '../../../../helpers/api/adminCalls.js';
import {getServiceLocation} from "../../../../helpers/api/adminCalls";


const {Option} = Select;


export default class ServiceLocationEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getServiceLocation(this.props.match.params.id), getUsers(), getCities(), getServices()])
            .then((responses) => {
                this.setState({
                    users: responses[1].data,
                    cities: responses[2].data,
                    services: responses[3].data,
                    longitude: responses[0].data.longitude,
                    latitude: responses[0].data.latitude,
                    city_id: responses[0].data.city_id,
                    user_id: responses[0].data.user_id,
                    service_id: responses[0].data.service_id,
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


        putServiceLocation(this.props.match.params.id,
            {
                "service_location": {
                    "longitude": this.state.longitude,
                    "latitude": this.state.latitude,
                    "city_id": this.state.city_id,
                    "user_id": this.state.user_id,
                    "service_id": this.state.service_id,
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
            return <Redirect to='/admin/user_locations'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="userLocations.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Longitud">
                                                <Input value={this.state.longitude} placeholder="longitud"
                                                       onChange={(e) => this.handleChange(e.target.value, 'longitude')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Latitud">
                                                <Input value={this.state.latitude} placeholder="latitud"
                                                       onChange={(e) => this.handleChange(e.target.value, 'latitude')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Ciudad">
                                                <Select value={this.state.city_id} placeholder="ciudad"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'city_id')
                                                }}>
                                                    {this.state && this.state.cities &&

                                                    this.state.cities.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
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
