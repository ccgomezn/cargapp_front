import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Form, Card, Select, message} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import moment from 'moment';
import {

    postService
} from '../../../../helpers/api/adminCalls.js';
import {
    getActiveCities,
    getActiveCompanies, getActiveStatus,
    getActiveUsers,
    getActiveVehicles, getActiveVehicleTypes, getMineUser,

} from "../../../../helpers/api/adminCalls";
import SecondaryButton from "../../../../components/custom/button/secondary";
import MapContainer from "../../../../components/maps/map";
import {midPointLatLong} from "../../../../helpers/geolocalization";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import {transformInputData} from "../../../../helpers/utility";
import DatePickerCustom from "../../../../components/custom/input/date";

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
        const { assign} = this.props;

        let getVehiclesFunction = function () {
        };


        if (assign) {
            getVehiclesFunction = function () {
                return getActiveVehicles();
            }
        }
        axios.all([getActiveUsers(), getActiveCities(), getActiveCompanies(), getVehiclesFunction(), getActiveVehicleTypes(), getActiveStatus()])
            .then((responses) => {
                this.setState({
                    users: responses[0].data,
                    cities: responses[1].data,
                    companies: responses[2].data,
                    vehicles_full: responses[3] ? this.getVehicleByUser(responses[3].data) : [],
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
        console.log(transformInputData(value))
        if (type === 'user_driver_id') {
            this.setState({vehicles: this.state.vehicles_full[transformInputData(value)]});
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

        getMineUser().then((response) => {
            let data = {
                service: {
                    name: this.state.name,
                    origin: this.state.origin,
                    origin_city_id: transformInputData(this.state.origin_city_id),
                    origin_address: this.state.origin_address,
                    origin_longitude: this.state.origin_longitude,
                    origin_latitude: this.state.origin_latitude,
                    destination: this.state.destination,
                    destination_city_id: transformInputData(this.state.destination_city_id),
                    destination_address: this.state.destination_address,
                    destination_latitude: this.state.destination_latitude,
                    destination_longitude: this.state.destination_longitude,
                    price: this.state.price,
                    description: this.state.description,
                    note: this.state.note,
                    user_id: response.data.user.id,
                    company_id: transformInputData(this.state.company_id),
                    user_receiver_id: transformInputData(this.state.user_receiver_id),
                    vehicle_type_id: transformInputData(this.state.vehicle_type_id),
                    statu_id: 10,
                    expiration_date: this.state.expiration_date,
                    contact: this.state.contact,
                    vehicle_id: 2,
                    active: true,
                }
            };
            if (this.props.assign) {
                data.service.user_driver_id = transformInputData(this.state.user_driver_id);
                data.service.vehicle_id = transformInputData(this.state.vehicle_id);
            }


            postService(data).then(() => {

                this.setState({redirect: true})
            })
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
        const {assign, admin, generator} = this.props;

        if (redirect) {
            if(admin){
                return <Redirect to='/admin/services'/>
            }else if(generator){
                return <Redirect to='/generator/services'/>
            }
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
                                        <Col span={24}>
                                            <Col span={24}>
                                                <Form.Item label="Nombre">
                                                    <TextInputCustom value={this.state.name} placeholder="nombre"
                                                                     label_id={'admin.title.name'}
                                                                     onChange={(e) => this.handleChange(e.target.value, 'name')}
                                                                     required/>
                                                </Form.Item>
                                            </Col>

                                        </Col>

                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Form.Item label="Origen">
                                                    <TextInputCustom value={this.state.origin} placeholder="origen"
                                                                     label_id={'admin.title.origin'}
                                                                     onChange={(e) => this.handleChange(e.target.value, 'origin')}
                                                                     required/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Ciudad de origen ">
                                                    <SelectInputCustom value={this.state.origin_city_id}
                                                                       placeholder="ciudad de origen"
                                                                       style={{width: '100%'}} onChange={(e) => {
                                                        this.handleChange(e, 'origin_city_id')
                                                    }}
                                                                       options={this.state && this.state.cities &&

                                                                       this.state.cities.map((item) => {
                                                                           return <Option
                                                                               value={item.id}>{item.name}</Option>
                                                                       })
                                                                       }
                                                                       label_id={'admin.title.city'}>

                                                    </SelectInputCustom>
                                                </Form.Item>
                                            </Col>

                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Form.Item label="Dirección de origen">
                                                    <TextInputCustom value={this.state.origin_address}
                                                                     placeholder="dirección de origen"
                                                                     onChange={(e) => this.handleChange(e.target.value, 'origin_address')}
                                                                     required
                                                                     label_id={'admin.title.address'}/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item wrapperCol={{span: 24}}>
                                                    <SecondaryButton message_id={"general.findOrigin"}
                                                                     style={{width: '200px', marginTop: '46px'}}
                                                                     onClick={() => this.handleSearchLocation(this.state.origin_city_id,
                                                                         this.state.origin_address, 'origin')}/>
                                                </Form.Item>

                                            </Col>
                                        </Col>

                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Form.Item label="Destino">
                                                    <TextInputCustom value={this.state.destination}
                                                                     placeholder="destino"
                                                                     onChange={(e) => this.handleChange(e.target.value, 'destination')}
                                                                     required
                                                                     label_id={'admin.title.destination'}/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Ciudad de destino ">
                                                    <SelectInputCustom value={this.state.destination_city_id}
                                                                       placeholder="ciudad de destino"
                                                                       style={{width: '100%'}} onChange={(e) => {
                                                        this.handleChange(e, 'destination_city_id')
                                                    }}
                                                                       options={this.state && this.state.cities &&

                                                                       this.state.cities.map((item) => {
                                                                           return <Option
                                                                               value={item.id}>{item.name}</Option>
                                                                       })
                                                                       }
                                                                       label_id={'admin.title.city'}>

                                                    </SelectInputCustom>
                                                </Form.Item>
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Form.Item label="Dirección de destino">
                                                    <TextInputCustom value={this.state.destination_address}
                                                                     placeholder="dirección de destino"
                                                                     onChange={(e) => this.handleChange(e.target.value, 'destination_address')}
                                                                     required
                                                                     label_id={'admin.title.address'}/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item wrapperCol={{span: 24}}>
                                                    <SecondaryButton message_id={"general.findDestination"}
                                                                     style={{width: '200px', marginTop: '46px'}}
                                                                     onClick={() => this.handleSearchLocation(this.state.destination_city_id,
                                                                         this.state.destination_address, 'destination')}/>
                                                </Form.Item>

                                            </Col>
                                        </Col>


                                    </Row>
                                    {admin &&
                                    <div>
                                        <Row gutter={10}>
                                            <Col span={24}>
                                                <Col span={6}>
                                                    <Form.Item label="Latitud origen">
                                                        <TextInputCustom value={this.state.origin_latitude}
                                                                         placeholder="latitud origen"
                                                                         onChange={(e) => this.handleChange(e.target.value, 'origin_latitude')}
                                                                         required
                                                                         label_id={'admin.title.latitude'}/>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item label="Longitud origen">
                                                        <TextInputCustom value={this.state.origin_longitude}
                                                                         placeholder="longitud origen"
                                                                         onChange={(e) => this.handleChange(e.target.value, 'origin_longitude')}
                                                                         required
                                                                         label_id={'admin.title.longitude'}/>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item label="Latitud destino">
                                                        <TextInputCustom value={this.state.destination_latitude}
                                                                         placeholder="latitud destino"
                                                                         onChange={(e) => this.handleChange(e.target.value, 'destination_latitude')}
                                                                         required
                                                                         label_id={'admin.title.latitude'}/>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item label="Longitud destino">
                                                        <TextInputCustom value={this.state.destination_longitude}
                                                                         placeholder="longitud destino"
                                                                         onChange={(e) => this.handleChange(e.target.value, 'destination_longitude')}
                                                                         required
                                                                         label_id={'admin.title.longitude'}/>
                                                    </Form.Item>
                                                </Col>
                                            </Col>


                                        </Row>
                                    </div>}


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
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Form.Item label="Precio">
                                                    <TextInputCustom value={this.state.price} placeholder="precio"
                                                                     onChange={(e) => this.handleChange(e.target.value, 'price')}
                                                                     required
                                                                     label_id={'admin.title.price'}/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Descripción">
                                                    <TextInputCustom value={this.state.description}
                                                                     placeholder="descripción"
                                                                     onChange={(e) => this.handleChange(e.target.value, 'description')}
                                                                     required
                                                                     label_id={'admin.title.description'}/>
                                                </Form.Item>
                                            </Col>
                                        </Col>

                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Form.Item label="Nota">
                                                    <TextInputCustom value={this.state.note} placeholder="nota"
                                                                     onChange={(e) => this.handleChange(e.target.value, 'note')}
                                                                     required
                                                                     label_id={'admin.title.note'}/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Empresa">
                                                    <SelectInputCustom value={this.state.company_id}
                                                                       placeholder="empresa"
                                                                       style={{width: '100%'}} onChange={(e) => {
                                                        this.handleChange(e, 'company_id')
                                                    }}
                                                                       options={this.state && this.state.companies &&

                                                                       this.state.companies.map((item) => {
                                                                           return <Option
                                                                               value={item.id}>{item.name}</Option>
                                                                       })
                                                                       }
                                                                       label_id={'admin.title.company'}>

                                                    </SelectInputCustom>
                                                </Form.Item>
                                            </Col>


                                        </Col>


                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Form.Item label="Receptor de carga">
                                                    <SelectInputCustom value={this.state.user_receiver_id}
                                                                       placeholder="receptor de carga"
                                                                       style={{width: '100%'}} onChange={(e) => {
                                                        this.handleChange(e, 'user_receiver_id')
                                                    }}
                                                                       options={this.state && this.state.users &&

                                                                       this.state.users.map((item) => {
                                                                           return <Option
                                                                               value={item.id}>{item.email}</Option>
                                                                       })
                                                                       }

                                                                       label_id={'admin.title.receiver'}>

                                                    </SelectInputCustom>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Tipo de vehiculo">
                                                    <SelectInputCustom value={this.state.vehicle_type_id}
                                                                       placeholder="tipo de vehiculo"
                                                                       style={{width: '100%'}} onChange={(e) => {
                                                        this.handleChange(e, 'vehicle_type_id')
                                                    }}
                                                                       options={this.state && this.state.vehicle_types &&

                                                                       this.state.vehicle_types.map((item) => {
                                                                           return <Option
                                                                               value={item.id}>{item.name}</Option>
                                                                       })
                                                                       }
                                                                       label_id={'admin.title.type'}>

                                                    </SelectInputCustom>
                                                </Form.Item>
                                            </Col>
                                        </Col>


                                    </Row>


                                    <Row gutter={10}>

                                        <Col span={12}>
                                            <Form.Item label="Fecha de expiración">
                                                {
                                                    this.state && this.state.expiration_date &&
                                                    <DatePickerCustom
                                                        defaultValue={moment(this.state.expiration_date, dateFormat)}
                                                        format={dateFormat}
                                                        label_id={'label.date'}
                                                        onChange={(e) => this.handleChange(e, 'expiration_date')}/>
                                                }
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Contacto">
                                                <TextInputCustom value={this.state.contact} placeholder="contacto"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'contact')}
                                                                 required
                                                                 label_id={'admin.title.contact'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    {assign &&
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Form.Item label="Conductor">
                                                    <SelectInputCustom value={this.state.user_driver_id}
                                                                       placeholder="conductor"
                                                                       style={{width: '100%'}} onChange={(e) => {
                                                        this.handleChange(e, 'user_driver_id')
                                                    }}
                                                                       options={this.state && this.state.users &&

                                                                       this.state.users.map((item) => {
                                                                           return <Option
                                                                               value={item.id}>{item.email}</Option>
                                                                       })
                                                                       }
                                                                       label_id={'admin.title.driver'}>

                                                    </SelectInputCustom>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Vehiculos">
                                                    <SelectInputCustom value={this.state.vehicle_id}
                                                                       placeholder="vehiculos"
                                                                       style={{width: '100%'}} onChange={(e) => {
                                                        this.handleChange(e, 'vehicle_id')
                                                    }}
                                                                       options={this.state && this.state.vehicles &&

                                                                       this.state.vehicles.map((item) => {
                                                                           return <Option
                                                                               value={item.id}>{item.plate} {item.brand}</Option>
                                                                       })
                                                                       }
                                                                       label_id={'admin.title.vehicle'}>

                                                    </SelectInputCustom>
                                                </Form.Item>
                                            </Col>
                                        </Col>

                                    </Row>
                                    }

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
