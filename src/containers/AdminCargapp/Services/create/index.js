import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Input, Card, Select, DatePicker, message} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import moment from 'moment';
import {
    getUsers,
    getCities,
    getCompanies,
    getVehicles,
    getVehicleTypes,
    postService
} from '../../../../helpers/api/adminCalls.js';
import {getStatus} from "../../../../helpers/api/adminCalls";
import SecondaryButton from "../../../../components/custom/button/secondary";
import MapContainer from "../../../../components/maps/map";
import {midPointLatLong} from "../../../../helpers/geolocalization";

require('dotenv').config();

const dateFormat = 'YYYY-MM-DD';

const {Option} = Select;

export default class ReportCreate extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false,
            lat_or: 0,
            lat_des: 0,
            long_or: 0,
            long_des: 0,
            error_lat_long: ''
        }
    }

    getVehicleByUser(data) {
        let data_by_id = {};
        data.map((item) => {
            if (data_by_id[item.user_id]) {
                data_by_id[item.user_id].push(item);
            } else {
                data_by_id[item.user_id] = [item];
            }
            return item;
        });

        return data_by_id;
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
        axios.all([getUsers(), getCities(), getCompanies(), getVehicles(), getVehicleTypes(), getStatus()])
            .then((responses) => {
                this.setState({
                    users: responses[0].data,
                    cities: responses[1].data,
                    companies: responses[2].data,
                    vehicles_full: this.getVehicleByUser(responses[3].data),
                    vehicles: [],
                    vehicle_types: responses[4].data,
                    status: responses[5].data,
                    cities_proc: this.transformDataToMap(responses[1].data, 'name'),
                    expiration_date: moment(),
                    origin_latitude: 4.710989,
                    origin_longitude: -74.072090,
                    destination_latitude: 4.710989,
                    destination_longitude: -74.072090,
                    center: {lat: 4.710989, lng: -74.072090}
                });

            });


    }

    handleChange(value, type) {
        if (type === 'user_driver_id') {
            this.setState({vehicles: this.state.vehicles_full[value]});
        }
        this.setState(
            {
                [type]: value
            }
        );
        this.setState((prevState) => ({
            center: midPointLatLong(Number(prevState.origin_latitude), Number(prevState.origin_longitude),
                Number(prevState.destination_latitude), Number(prevState.destination_longitude))
        }));
    }

    handlePost() {
        postService(
            {
                service: {
                    name: this.state.name,
                    origin: this.state.origin,
                    origin_city_id: this.state.origin_city_id,
                    origin_address: this.state.origin_address,
                    origin_longitude: this.state.origin_longitude,
                    origin_latitude: this.state.origin_latitude,
                    destination: this.state.destination,
                    destination_city_id: this.state.destination_city_id,
                    destination_address: this.state.destination_address,
                    destination_latitude: this.state.destination_latitude,
                    destination_longitude: this.state.destination_longitude,
                    price: this.state.price,
                    description: this.state.description,
                    note: this.state.note,
                    user_id: this.state.user_id,
                    company_id: this.state.company_id,
                    user_driver_id: this.state.user_driver_id,
                    user_receiver_id: this.state.user_receiver_id,
                    vehicle_type_id: this.state.vehicle_type_id,
                    vehicle_id: this.state.vehicle_id,
                    statu_id: this.state.statu_id,
                    expiration_date: this.state.expiration_date,
                    contact: this.state.contact,
                    active: true,
                }
            }).then(() => {
            this.setState({redirect: true})
        })
    }

    handleSearchLocation(city_id, address, type) {
        let city = this.state.cities_proc[city_id];
        let address_full = address + ',' + city;
        axios.post('https://maps.googleapis.com/maps/api/geocode/json?address=' + address_full + '&key=' + process.env.REACT_APP_GOOLE_MAPS_API_KEY).then((response) => {
            if (response.data.results.length === 0) {
                message.error('Dirección no encontrada');
            } else {
                let data = response.data.results[0];
                if (type === 'origin') {
                    this.setState({
                        origin_longitude: data.geometry.location.lng,
                        origin_latitude: data.geometry.location.lat,
                    })
                } else {
                    this.setState({
                        destination_longitude: data.geometry.location.lng,
                        destination_latitude: data.geometry.location.lat,
                    })
                }

            }
            this.setState({
                center: midPointLatLong(Number(this.state.origin_latitude), Number(this.state.origin_longitude),
                    Number(this.state.destination_latitude), Number(this.state.destination_longitude))
            })
        })

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
                                <Form>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Nombre">
                                                <Input value={this.state.name} placeholder="nombre"
                                                       onChange={(e) => this.handleChange(e.target.value, 'name')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Origen">
                                                <Input value={this.state.origin} placeholder="origen"
                                                       onChange={(e) => this.handleChange(e.target.value, 'origin')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Ciudad de origen ">
                                                <Select value={this.state.origin_city_id} placeholder="ciudad de origen"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'origin_city_id')
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
                                            <Form.Item label="Dirección de origen">
                                                <Input value={this.state.origin_address}
                                                       placeholder="dirección de origen"
                                                       onChange={(e) => this.handleChange(e.target.value, 'origin_address')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Destino">
                                                <Input value={this.state.destination} placeholder="destino"
                                                       onChange={(e) => this.handleChange(e.target.value, 'destination')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Ciudad de destino ">
                                                <Select value={this.state.destination_city_id}
                                                        placeholder="ciudad de destino"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'destination_city_id')
                                                }}>
                                                    {this.state && this.state.cities &&

                                                    this.state.cities.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Form.Item label="Dirección de destino">
                                                    <Input value={this.state.destination_address}
                                                           placeholder="dirección de destino"
                                                           onChange={(e) => this.handleChange(e.target.value, 'destination_address')}
                                                           required/>
                                                </Form.Item>
                                            </Col>
                                        </Col>

                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={6}>
                                            <Form.Item label="Latitud origen">
                                                <Input value={this.state.origin_latitude} placeholder="latitud origen"
                                                       onChange={(e) => this.handleChange(e.target.value, 'origin_latitude')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Longitud origen">
                                                <Input value={this.state.origin_longitude} placeholder="longitud origen"
                                                       onChange={(e) => this.handleChange(e.target.value, 'origin_longitude')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Latitud destino">
                                                <Input value={this.state.destination_latitude}
                                                       placeholder="latitud destino"
                                                       onChange={(e) => this.handleChange(e.target.value, 'destination_latitude')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Longitud destino">
                                                <Input value={this.state.destination_longitude}
                                                       placeholder="longitud destino"
                                                       onChange={(e) => this.handleChange(e.target.value, 'destination_longitude')}
                                                       required/>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <SecondaryButton message_id={"general.findOrigin"}
                                                                 style={{width: '200px'}}
                                                                 onClick={() => this.handleSearchLocation(this.state.origin_city_id,
                                                                     this.state.origin_address, 'origin')}/>
                                            </Form.Item>

                                        </Col>
                                        <Col span={12}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <SecondaryButton message_id={"general.findDestination"}
                                                                 style={{width: '200px'}}
                                                                 onClick={() => this.handleSearchLocation(this.state.destination_city_id,
                                                                     this.state.destination_address, 'destination')}/>
                                            </Form.Item>

                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={24}>
                                            <MapContainer markers={[{
                                                position: {
                                                    lat: Number(this.state.origin_latitude),
                                                    lng: Number(this.state.origin_longitude),
                                                }
                                            },
                                                {
                                                    position: {
                                                        lat: Number(this.state.destination_latitude),
                                                        lng: Number(this.state.destination_longitude),
                                                    }
                                                }]} center={this.state.center ? this.state.center : {
                                                lat: 4.710989,
                                                lng: -74.072090
                                            }} block style={{height: 500}} isFreight={false}/>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>

                                        <Col span={12}>
                                            <Form.Item label="Precio">
                                                <Input value={this.state.price} placeholder="precio"
                                                       onChange={(e) => this.handleChange(e.target.value, 'price')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Descripción">
                                                <Input value={this.state.description} placeholder="descripción"
                                                       onChange={(e) => this.handleChange(e.target.value, 'description')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Nota">
                                                <Input value={this.state.note} placeholder="nota"
                                                       onChange={(e) => this.handleChange(e.target.value, 'note')}
                                                       required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Usuario">
                                                <Select value={this.state.user_id}
                                                        placeholder="usuario"
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
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Empresa">
                                                <Select value={this.state.company_id}
                                                        placeholder="empresa"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'company_id')
                                                }}>
                                                    {this.state && this.state.companies &&

                                                    this.state.companies.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Conductor">
                                                <Select value={this.state.user_driver_id} placeholder="conductor"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'user_driver_id')
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
                                        <Col span={12}>
                                            <Form.Item label="Receptor de carga">
                                                <Select value={this.state.user_receiver_id}
                                                        placeholder="receptor de carga"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'user_receiver_id')
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
                                            <Form.Item label="Tipo de vehiculo">
                                                <Select value={this.state.vehicle_type_id}
                                                        placeholder="tipo de vehiculo"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'vehicle_type_id')
                                                }}>
                                                    {this.state && this.state.vehicle_types &&

                                                    this.state.vehicle_types.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Vehiculos">
                                                <Select value={this.state.vehicle_id}
                                                        placeholder="vehiculos"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'vehicle_id')
                                                }}>
                                                    {this.state && this.state.vehicles &&

                                                    this.state.vehicles.map((item) => {
                                                        return <Option
                                                            value={item.id}>{item.plate} {item.brand}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Status">
                                                <Select value={this.state.statu_id}
                                                        placeholder="status"
                                                        style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'statu_id')
                                                }}>
                                                    {this.state && this.state.status &&

                                                    this.state.status.map((item) => {
                                                        return <Option value={item.id}>{item.name}</Option>
                                                    })
                                                    }
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>

                                        <Col span={12}>
                                            <Form.Item label="Fecha de expiración">
                                                {
                                                    this.state && this.state.expiration_date &&
                                                    <DatePicker
                                                        defaultValue={moment(this.state.expiration_date, dateFormat)}
                                                        format={dateFormat}
                                                        onChange={(e) => this.handleChange(e, 'expiration_date')}/>
                                                }
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Contacto">
                                                <Input value={this.state.contact} placeholder="contacto"
                                                       onChange={(e) => this.handleChange(e.target.value, 'contact')}
                                                       required/>
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
