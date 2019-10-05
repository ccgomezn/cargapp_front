import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, message} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Select} from 'antd';
import moment from 'moment';
import {
    getService,
    getUsers,
    getCities,
    getCompanies,
    getVehicles,
    getVehicleTypes,
    putService
} from '../../../../helpers/api/adminCalls.js';
import {getStatus} from "../../../../helpers/api/adminCalls";
import SecondaryButton from "../../../../components/custom/button/secondary";
import MapContainer from "../../../../components/maps/map";
import {midPointLatLong} from "../../../../helpers/geolocalization";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import {transformInputData} from "../../../../helpers/utility";
import importantVariables from "../../../../helpers/hashVariables";
import DatePickerCustom from "../../../../components/custom/input/date";


const dateFormat = 'YYYY-MM-DD';
const {Option} = Select;


export default class ServiceEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
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
        axios.all([getService(this.props.match.params.id), getUsers(), getCities(), getCompanies(), getVehicles(), getVehicleTypes(), getStatus()])
            .then((responses) => {
                this.setState({
                    users: responses[1].data,
                    cities: responses[2].data,
                    companies: responses[3].data,
                    vehicles_full: this.getVehicleByUser(responses[4].data),
                    vehicles: [],
                    vehicle_types: responses[5].data,
                    cities_proc: this.transformDataToMap(responses[2].data, 'name'),
                    status: responses[6].data,
                    name: responses[0].data.name,
                    origin: responses[0].data.origin,
                    origin_city_id: responses[0].data.origin_city_id,
                    origin_address: responses[0].data.origin_address,
                    origin_longitude: responses[0].data.origin_longitude,
                    origin_latitude: responses[0].data.origin_latitude,
                    destination: responses[0].data.destination,
                    destination_city_id: responses[0].data.destination_city_id,
                    destination_address: responses[0].data.destination_address,
                    destination_latitude: responses[0].data.destination_latitude,
                    destination_longitude: responses[0].data.destination_longitude,
                    price: responses[0].data.price,
                    description: responses[0].data.description,
                    note: responses[0].data.note,
                    user_id: responses[0].data.user_id,
                    company_id: responses[0].data.company_id,
                    user_driver_id: responses[0].data.user_driver_id,
                    user_receiver_id: responses[0].data.user_receiver_id,
                    vehicle_type_id: responses[0].data.vehicle_type_id,
                    vehicle_id: responses[0].data.vehicle_id,
                    statu_id: responses[0].data.statu_id,
                    expiration_date: responses[0].data.expiration_date,
                    contact: responses[0].data.contact,
                    report_type: responses[0].data.report_type,
                    active: responses[0].data.active,
                });
                this.setState({vehicles: this.state.vehicles_full[transformInputData(this.state.user_driver_id)]});
            }).catch((error) => {
            console.error(error);
        });
    }

    handleChange(value, type) {
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

    handlePut() {

        putService(this.props.match.params.id,
            {
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
                    user_id: transformInputData(this.state.user_id),
                    company_id: transformInputData(this.state.company_id),
                    user_receiver_id: transformInputData(this.state.user_receiver_id),
                    vehicle_type_id: transformInputData(this.state.vehicle_type_id),
                    statu_id: transformInputData(this.state.statu_id),
                    expiration_date: this.state.expiration_date,
                    contact: this.state.contact,
                    active: transformInputData(this.state.active),
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
        }).catch((error) => {
            console.log(error);
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
                                                <TextInputCustom value={this.state.name} placeholder="nombre"
                                                                 label_id={'admin.title.name'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'name')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Origen">
                                                <TextInputCustom value={this.state.origin} placeholder="origen"
                                                                 label_id={'admin.title.origin'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'origin')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
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
                                        <Col span={12}>
                                            <Form.Item label="Dirección de origen">
                                                <TextInputCustom value={this.state.origin_address}
                                                                 placeholder="dirección de origen"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'origin_address')}
                                                                 required
                                                                 label_id={'admin.title.address'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Destino">
                                                <TextInputCustom value={this.state.destination} placeholder="destino"
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
                                        </Col>

                                    </Row>
                                    <Row gutter={10}>
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
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Nota">
                                                <TextInputCustom value={this.state.note} placeholder="nota"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'note')}
                                                                 required
                                                                 label_id={'admin.title.note'}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Usuario">
                                                <SelectInputCustom value={this.state.user_id}
                                                                   placeholder="usuario"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'user_id')
                                                }}
                                                                   options={this.state && this.state.users &&

                                                                   this.state.users.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.email}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.user'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={10}>
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


                                    </Row>

                                    <Row gutter={10}>
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
                                    </Row>

                                    <Row gutter={10}>

                                        <Col span={12}>
                                            <Form.Item label="Status">
                                                <SelectInputCustom value={this.state.statu_id}
                                                                   placeholder="status"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'statu_id')
                                                }}
                                                                   options={this.state && this.state.status &&

                                                                   this.state.status.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.status'}>

                                                </SelectInputCustom>
                                            </Form.Item>
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
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Estado">
                                                <SelectInputCustom required value={this.state.active}
                                                                   placeholder="estado"
                                                                   options={importantVariables.activeOptions.map((item) => {
                                                                       return <Option
                                                                           value={item.key}>{item.label}</Option>
                                                                   })}
                                                                   label_id={'admin.title.active'}
                                                                   style={{width: 120}} onChange={(e) => {
                                                    this.handleChange(e, 'active')
                                                }}>
                                                </SelectInputCustom>
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
