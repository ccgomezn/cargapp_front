import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
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
import {getStatus, getUserLocation} from "../../../../helpers/api/adminCalls";
import MapContainer from "../../../../components/maps/map";
import ReportsSmallWidget from "../../../Dashboard/reportsmall/report-widget";
import IsoWidgetsWrapper from "../../../Dashboard/widgets-wrapper";

export default class ServiceDetail extends Component {


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
                    user_driver_id: responses[0].data.user_driver_id,
                    user_receiver: data_users[responses[0].data.user_receiver_id],
                    vehicle_type: data_vehicle_types[responses[0].data.vehicle_type_id],
                    vehicle: data_vehicles[responses[0].data.vehicle_id],
                    status: data_status[responses[0].data.statu_id],
                    expiration_date: responses[0].data.expiration_date,
                    contact: responses[0].data.contact,
                    report_type: responses[0].data.report_type,
                    active: responses[0].data.active,
                });
                getUserLocation(1).then((response) => {
                    this.setState({
                        user_location: [{
                            position: {
                                lat: parseInt(response.data.latitude),
                                lng: parseInt(response.data.longitude)
                            },
                            icon: {
                                url: require('../../../../image/truck_down_right.svg'),
                            }
                        }],
                        direction: {
                            origin: this.state.origin_latitude + ', ' +this.state.origin_longitude,
                            destination: this.state.destination_latitude + ', ' +this.state.destination_longitude
                        }
                    })
                    ;
                })
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
                                        <IntlMessages id="service.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Row style={rowStyle} gutter={10} justify="start">
                                <Col lg={18} md={18} sm={18} xs={18} style={colStyle}>

                                    <div style={{height: 500, width: '100%'}}>
                                        <Row>
                                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                                <MapContainer center={{
                                                    lat: 4.710989,
                                                    lng: -74.072090
                                                }} block style={{height: 500}}
                                                              markers={this.state.user_location}
                                                              direction={this.state.direction}/>
                                            </Col>

                                        </Row>

                                    </div>

                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6} style={colStyle}>
                                    <IsoWidgetsWrapper>
                                        <div className="vehiclesOnTrack">
                                            <ReportsSmallWidget
                                                label={<IntlMessages id="widget.serviceDetail"/>}

                                                hr={<hr style={{marginTop: 0}}/>}
                                            >
                                                <LayoutWrapper>
                                                    <div className={'cardContent'}>
                                                        <Row>
                                                            <label>
                                                                <IntlMessages id={'service.origin'}/>:
                                                            </label>
                                                        </Row>
                                                        <Row>
                                                            <p>
                                                                {this.state.origin_city} - {this.state.origin}
                                                            </p>
                                                        </Row>
                                                        <Row>
                                                            <label>
                                                                <IntlMessages id={'service.destination'}/>:
                                                            </label>
                                                        </Row>
                                                        <Row>
                                                            <p>
                                                                {this.state.destination_city} - {this.state.destination}
                                                            </p>
                                                        </Row>
                                                        <Row>
                                                            <label>
                                                                <IntlMessages id={'service.driver'}/>:
                                                            </label>
                                                        </Row>
                                                        <Row>

                                                            <p>
                                                                <a href={'/admin/users/show/' + this.state.user_driver_id}>{this.state.user_driver}</a>
                                                            </p>
                                                        </Row>

                                                        <Row>
                                                            <label>
                                                                <IntlMessages id={'service.description'}/>:
                                                            </label>
                                                        </Row>
                                                        <Row>

                                                            <p>
                                                                {this.state.description}
                                                            </p>
                                                        </Row>
                                                        <Row>
                                                            <label>
                                                                <IntlMessages id={'service.note'}/>:
                                                            </label>
                                                        </Row>
                                                        <Row>

                                                            <p>
                                                                {this.state.note}
                                                            </p>
                                                        </Row>
                                                        <Row>
                                                            <label>
                                                                <IntlMessages id={'service.price'}/>:
                                                            </label>
                                                        </Row>
                                                        <Row>

                                                            <p style={{height: '0px'}}>
                                                                {this.state.price}
                                                            </p>
                                                        </Row>
                                                    </div>
                                                </LayoutWrapper>
                                            </ReportsSmallWidget>
                                        </div>
                                    </IsoWidgetsWrapper>
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


                        </Row>

                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}
