import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form, Card} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import MapContainer from "../../../../components/maps/map";
import ReportsSmallWidget from "../../../Dashboard/reportsmall/report-widget";
import IsoWidgetsWrapper from "../../../Dashboard/widgets-wrapper";
import importantVariables from "../../../../helpers/hashVariables";
import {Steps} from 'antd';
import SecondaryButton from "../../../../components/custom/button/secondary";
import {getActiveUsers, getUserLocation} from "../../../../helpers/api/users";
import {getActiveCompanies} from "../../../../helpers/api/companies";
import {getService, putService} from "../../../../helpers/api/services";
import {getActiveVehicles, getActiveVehicleTypes} from "../../../../helpers/api/vehicles";
import {getActiveCities} from "../../../../helpers/api/locations";
import {getActiveModels, getStatusOfModel} from "../../../../helpers/api/internals";

const {Step} = Steps;
const google = window.google = window.google ? window.google : {};

export default class ServiceDetail extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }

    transformDataToMap(data, key, key1 = null) {
        var dataTransformed = {};
        data.map((item) => {
            if (key1 === null) {
                dataTransformed[item.id] = item[key];
            } else {
                dataTransformed[item[key1]] = item[key];
            }
            return item;
        });

        return dataTransformed
    }

    componentWillMount() {


        getActiveModels().then(response => {
            let model_id = '';

            response.data.forEach(model => {
                if (model.code === 'SERVICE') {
                    model_id = model.id
                }
            });
            axios.all([getService(this.props.match.params.id), getActiveUsers(), getActiveCities(), getActiveCompanies(), getActiveVehicles(), getActiveVehicleTypes(), getStatusOfModel(model_id)])
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
                    let data_status_code = this.transformDataToMap(responses[6].data, 'code');

                    let data_status_from_code = this.transformDataToMap(responses[6].data, 'id', 'code');
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
                        statu_id: responses[0].data.statu_id,
                        expiration_date: responses[0].data.expiration_date,
                        contact: responses[0].data.contact,
                        report_type: responses[0].data.report_type,
                        active: responses[0].data.active,
                        status_code: data_status_code,
                        status_from_code: data_status_from_code
                    });
                    getUserLocation(this.state.user_driver_id).then((response) => {
                        if (response.data[0]) {
                            this.setState({
                                user_location: {
                                    position: {
                                        lat: parseFloat(response.data[0].latitude),
                                        lng: parseFloat(response.data[0].longitude)
                                    },
                                    icon: {
                                        url: require('../../../../image/truck_down_right.svg'),
                                    }
                                },
                            })
                        }
                        let origin;
                        let destination;
                        if (this.state.statu_id === 12) {
                            origin = this.state.origin_latitude + ', ' + this.state.origin_longitude;
                            destination = this.state.destination_latitude + ', ' + this.state.destination_longitude;
                        } else if (this.state.statu_id === 6 || this.state.statu_id === 7) {
                            origin = response.data[0].latitude + ', ' + response.data[0].longitude;
                            destination = this.state.origin_latitude + ', ' + this.state.origin_longitude;
                        } else {
                            origin = response.data[0].latitude + ', ' + response.data[0].longitude;
                            destination = this.state.destination_latitude + ', ' + this.state.destination_longitude;
                        }

                        this.setState({

                            origin_marker: {
                                position: {
                                    lat: parseFloat(this.state.origin_latitude),
                                    lng: parseFloat(this.state.origin_longitude)
                                }
                            },
                            destination_marker: {
                                position: {
                                    lat: parseFloat(this.state.destination_latitude),
                                    lng: parseFloat(this.state.destination_longitude)
                                }
                            }
                        })
                        ;


                        const DirectionsService = new google.maps.DirectionsService();

                        DirectionsService.route({
                            origin: origin,
                            destination: destination,
                            travelMode: google.maps.TravelMode.DRIVING,
                        }, (result, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    directions: result.routes[0].overview_path,
                                    distance: result.routes[0].legs[0].distance.text,
                                    duration: result.routes[0].legs[0].duration.text,
                                });
                            }
                        });
                    });
                }).catch((error) => {
                console.error(error);
            });
        })

    }

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        );
    }

    goBack() {
        if (this.props.generator) {
            this.props.history.push('/generator/services')
        } else {
            this.props.history.push('/admin/services')
        }
    }


    changeStatus() {
        let newCode = importantVariables.status_road_service_map[this.state.status_code[this.state.statu_id]].next;
        let newId = this.state.status_from_code[newCode];
        putService(this.props.match.params.id, {statu_id: newId}).then(() => window.location.reload());
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;
        const {generator} = this.props;
        const {id} = this.props.match.params;
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
                                        <IntlMessages id={"service.title"}/>
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
                                                }} block style={{height: 700}}
                                                              markers={[this.state.origin_marker, this.state.destination_marker, this.state.user_location]}
                                                              directions={this.state.directions}/>
                                            </Col>

                                        </Row>

                                    </div>

                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6} style={colStyle}>
                                    <IsoWidgetsWrapper>
                                        <div className="vehiclesOnTrack" style={{height: 700}}>
                                            <ReportsSmallWidget
                                                label={<IntlMessages id="widget.serviceDetail"/>}
                                                style={{height: 700}}
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
                                                                <a href={generator ? '/generator/users/show/' + this.state.user_driver_id + '/' + id : '/admin/users/show/' + this.state.user_driver_id}>{this.state.user_driver}</a>
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

                                                            <p>
                                                                {this.state.price}
                                                            </p>
                                                        </Row>
                                                        <Row>
                                                            <label>
                                                                <IntlMessages id={'service.distance'}/>:
                                                            </label>
                                                        </Row>
                                                        <Row>

                                                            <p>
                                                                {this.state.distance}
                                                            </p>
                                                        </Row>
                                                        <Row>
                                                            <label>
                                                                <IntlMessages id={'service.duration'}/>:
                                                            </label>
                                                        </Row>
                                                        <Row>

                                                            <p style={{height: '0px'}}>
                                                                {this.state.duration}
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

                            </Row>
                            <Col span={24}>
                                <Card style={{marginBottom: 30}} className="cardContent">
                                    <Row>
                                        <Col lg={24} md={24} sm={24} xs={24}>
                                            <Row>
                                                {this.state.status_code && <Steps
                                                    current={importantVariables.status_road_service_map[this.state.status_code[this.state.statu_id]].id}>
                                                    <Step title="Esperando"/>
                                                    <Step title="Camino a carga"/>
                                                    <Step title="Cargando"/>
                                                    <Step title="Viajando"/>
                                                    <Step title="Descargando"/>
                                                    <Step title="Terminado"/>
                                                </Steps>}


                                            </Row>
                                        </Col>
                                        <Col lg={24} md={24} sm={24} xs={24} style={{paddingTop: '20px'}}>
                                            <Row>
                                                <SecondaryButton message_id={"general.changeStatus"}
                                                                 style={{width: '200px'}}
                                                                 onClick={() => this.changeStatus()}/>

                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
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
