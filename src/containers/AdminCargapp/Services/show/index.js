import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {
    getService,
    getUsers,
    getCities,
    getCompanies,
    getVehicles,
    getVehicleTypes,
} from '../../../../helpers/api/adminCalls.js';
import {getStatus} from "../../../../helpers/api/adminCalls";

export default class ServiceShow extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }

    transformDataToMap(data, key) {
        var dataTransformed = {};
        data.map((item) => {
            dataTransformed[item.id] = item[key];
            return item;
        });

        return dataTransformed
    }

    componentWillMount() {
        axios.all([getService(this.props.match.params.id), getUsers(), getCities(), getCompanies(), getVehicles(), getVehicleTypes(), getStatus()])
            .then((responses) => {

                if (responses[0].data.active) {
                    responses[0].data.active = 'Activo';
                } else {
                    responses[0].data.active = 'Desactivado';
                }


                let data_users = this.transformDataToMap(responses[1].data, 'email');
                let data_cities = this.transformDataToMap(responses[2].data, 'name');
                let data_companies = this.transformDataToMap(responses[3].data, 'name');
                let data_vehicles = this.transformDataToMap(responses[4].data, 'name');
                let data_vehicle_types = this.transformDataToMap(responses[5].data, 'name');
                let data_status = this.transformDataToMap(responses[6].data, 'name');
                this.setState({
                    name: responses[0].data.name,
                    origin: responses[0].data.origin,
                    origin_city: data_cities[responses[0].data.origin_city_id],
                    origin_address: responses[0].data.origin_address,
                    origin_longitude: responses[0].data.origin_longitude,
                    origin_latitude: responses[0].data.origin_latitude,
                    destination: responses[0].data.destination,
                    destination_city: data_cities[responses[0].data.destination_city_id],
                    destination_address: responses[0].data.destination_address,
                    destination_latitude: responses[0].data.destination_latitude,
                    destination_longitude: responses[0].data.destination_longitude,
                    price: responses[0].data.price,
                    description: responses[0].data.description,
                    note: responses[0].data.note,
                    user: data_users[responses[0].data.user_id],
                    company: data_companies[responses[0].data.company_id],
                    user_driver: data_users[responses[0].data.user_driver_id],
                    user_receiver: data_users[responses[0].data.user_receiver_id],
                    vehicle_type: data_vehicle_types[responses[0].data.vehicle_type_id],
                    vehicle: data_vehicles[responses[0].data.vehicle_id],
                    status: data_status[responses[0].data.statu_id],
                    expiration_date: responses[0].data.expiration_date,
                    contact: responses[0].data.contact,
                    report_type: responses[0].data.report_type,
                    active: responses[0].data.active,
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

    goBack() {
        this.props.history.push('/admin/services')
    }


    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/services'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="services.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Nombre">
                                            <p>{this.state.name}</p>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Origen">
                                            <p>{this.state.origin}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Ciudad de origen">
                                            <p>{this.state.origin_city}</p>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Dirección de origen">
                                            <p>{this.state.origin_address}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Longitud de origen">
                                            <p>{this.state.origin_longitude}</p>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Latitud de origen">
                                            <p>{this.state.origin_latitude}</p>
                                        </Form.Item>
                                    </Col>

                                </Row>


                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="Destino">
                                            <p>{this.state.destination}</p>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Ciudad de destino">
                                          <p>{this.state.destination_address}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={12}>
                                        <Form.Item label="Latitud de destino">
                                            <p>{this.state.destination_latitude}</p>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Longitud de destino">
                                            <p>{this.state.destination_longitude}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>

                              <Row>
                                <Col span={12}>
                                  <Form.Item label="Precio">
                                    <p>{this.state.price}</p>
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="Descripción">
                                    <p>{this.state.description}</p>
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={12}>
                                  <Form.Item label="Nota">
                                    <p>{this.state.note}</p>
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="Usuario">
                                    <p>{this.state.user}</p>
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row>
                                <Col span={12}>
                                  <Form.Item label="Empresa">
                                    <p>{this.state.company}</p>
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="Conductor">
                                    <p>{this.state.user_driver}</p>
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row>
                                <Col span={12}>
                                  <Form.Item label="Receptor">
                                    <p>{this.state.user_receiver}</p>
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="Tipo de conductor">
                                    <p>{this.state.vehicle_type}</p>
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Row>
                                <Col span={12}>
                                  <Form.Item label="Status">
                                    <p>{this.state.status}</p>
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item label="Fecha de vencimiento">
                                    <p>{this.state.expiration_date}</p>
                                  </Form.Item>
                                </Col>
                              </Row>

                                <Row>
                                  <Col span={12}>
                                    <Form.Item label="Contacto">
                                      <p>{this.state.contact}</p>
                                    </Form.Item>
                                  </Col>
                                    <Col span={12}>
                                        <Form.Item label="Estado de activación">
                                            <p>{this.state.active}</p>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Form.Item wrapperCol={{span: 24}}>
                                            <PrimaryButton message_id={"general.back"} style={{width: '200px'}}
                                                           onClick={() => this.goBack()}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>


                        </Row>

                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}
