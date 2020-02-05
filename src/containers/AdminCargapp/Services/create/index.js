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
import SecondaryButton from "../../../../components/custom/button/secondary";
import MapContainer from "../../../../components/maps/map";
import {midPointLatLong} from "../../../../helpers/geolocalization";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import CheckBoxCustom from "../../../../components/custom/input/checkBox";
import {transformInputData} from "../../../../helpers/utility";
import DatePickerCustom from "../../../../components/custom/input/date";
import {checkUser, getActiveUsers, getMineUser, postUserPaymentMethod} from "../../../../helpers/api/users";
import {getActiveCompanies} from "../../../../helpers/api/companies";
import {postService} from "../../../../helpers/api/services";
import {getActiveVehicles, getActiveVehicleTypes} from "../../../../helpers/api/vehicles";
import {getActiveCities} from "../../../../helpers/api/locations";
import {getActiveModels, getStatusOfModel, findParameters} from "../../../../helpers/api/internals";
import Modal from '../../../../components/feedback/modal';
import {getActivePaymentMethods} from "../../../../helpers/api/payments";
import CreditCardInput from "react-credit-card-input";

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
            error_lat_long: '',
            visible: false
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

    handleAddPaymentMethod() {
        getMineUser().then(response => {
            postUserPaymentMethod({
                user_payment_method: {
                    payment_method_id: 2,
                    card_number: this.state.card_number,
                    cvv: this.state.cvv,
                    expiration: this.state.expiration,
                    user_id: response.data.user.id
                }
            }).then(() => {
                this.setState({visible: false});
                this.handlePost();
            })
        })
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
        const {assign} = this.props;
        let getVehiclesFunction = function () {
        };
        if (assign) {
            getVehiclesFunction = function () {
                return getActiveVehicles();
            }
        }
        getActiveModels().then((response) => {
            let model_id = '';

            response.data.forEach(model => {
                if (model.code === 'SERVICE') {
                    model_id = model.id
                }
            });

            axios.all([getActiveUsers(), getActiveCities(), getActiveCompanies(), getVehiclesFunction(), 
                        getActiveVehicleTypes(), getStatusOfModel(model_id), getActivePaymentMethods(),
                        findParameters('PACKING_TYPES')])
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
                        center: {lat: 4.710989, lng: -74.072090},
                        payment_methods: responses[6].data,
                        packing_types: responses[7].data.parameters,
                        priceChecked: false,
                        priceDisabled: false,
                    });
                });
        });
    }

    handleChange(value, type) {
      console.log(value, type);
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
        checkUser().then((response) => {
            let payment = false;

            response.data.forEach(model => {
                if (model.name === 'user_payment_methods') {
                    payment = model.permission
                }
            });
            if (!payment) {
                this.setState({
                    visible: true
                })
            } else {
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
                            load_weight: this.state.load_weight,
                            load_volume: this.state.load_volume,
                            description: this.state.description,
                            packing: transformInputData(this.state.packing),
                            note: this.state.note,
                            user_id: response.data.user.id,
                            company_id: this.state.company_id ? transformInputData(this.state.company_id) : 19,
                            user_receiver_id: transformInputData(this.state.user_receiver_id),
                            vehicle_type_id: transformInputData(this.state.vehicle_type_id),
                            statu_id: 10,
                            expiration_date: this.state.expiration_date,
                            contact_name: this.state.contact_name,
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
        });


    }

    handleSearchLocation(city_id, address, type) {
        let city = this.state.cities_proc[city_id];
        let address_full = encodeURIComponent(address + ',' + city);
        axios.post(encodeURI('https://maps.googleapis.com/maps/api/geocode/json?region=CO' + 
          '&address=' + address_full + '' + '&key=' + process.env.REACT_APP_GOOLE_MAPS_API_KEY),)
          .then((response) => {
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
            if (admin) {
                return <Redirect to='/admin/services'/>
            } else if (generator) {
                return <Redirect to='/generator/services'/>
            } else {
                return <Redirect to='/admin/services'/>
            }
        }
        return (
            <LayoutWrapper style={{paddingTop: 10}}>
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

                        <Row style={rowStyle} gutter={10}>
                            <Card className="cardContent" >

                                <Col lg={12} md={24} sm={24} xs={24}>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Form.Item label="Ciudad de origen ">
                                                    <SelectInputCustom value={this.state.origin_city_id}
                                                                       placeholder="ciudad de origen"
                                                                       style={{width: '100%'}} onChange={(e) => {
                                                        this.handleChange(e, 'origin_city_id');
                                                        this.handleChange(e.label, 'origin');
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
                                                                     onClick={() => this.handleSearchLocation(transformInputData(this.state.origin_city_id),
                                                                         this.state.origin_address, 'origin')}/>
                                                </Form.Item>

                                            </Col>
                                        </Col>

                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Col span={12}>
                                                <Form.Item label="Ciudad de destino ">
                                                    <SelectInputCustom value={this.state.destination_city_id}
                                                                       placeholder="ciudad de destino"
                                                                       style={{width: '100%'}} onChange={(e) => {
                                                        this.handleChange(e, 'destination_city_id');
                                                        this.handleChange(e.label, 'destination');
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
                                                                     onClick={() => this.handleSearchLocation(transformInputData(this.state.destination_city_id),
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

                                </Col>
                                <Col lg={12} md={24} sm={24} xs={24}>
                                    <Row>
                                        <Col span={24}>
                                            <MapContainer markers={[{
                                                position: {
                                                    lat: Number(this.state.origin_latitude),
                                                    lng: Number(this.state.origin_longitude),
                                                },
                                                icon: {
                                                    url: require('../../../../image/origin.png'),
                                                }
                                            },
                                                {
                                                    position: {
                                                        lat: Number(this.state.destination_latitude),
                                                        lng: Number(this.state.destination_longitude),
                                                    },
                                                    icon: {
                                                        url: require('../../../../image/destination.svg'),
                                                    }
                                                }]} center={this.state.center ? this.state.center : {
                                                lat: 4.710989,
                                                lng: -74.072090
                                            }} block style={{height: 500}} isFreight={false}/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Card>

                        </Row>

                        <Row style={rowStyle} gutter={10}>
                            <Card className="cardContent" style={{marginTop: '1%'}}>
                                <Form>

                                    <Row gutter={10}>
                                        <Col span={24}>
                                            <Col span={6}>
                                                <Form.Item label="Cual es su oferta para este flete">
                                                    <TextInputCustom value={this.state.price}
                                                                     disabled={this.state.priceDisabled}
                                                                     placeholder="valor del flete"
                                                                     onChange={(e) => this.handleChange(e.target.value, 'price')}
                                                                     label_id={'admin.title.price'}
                                                                     required
                                                                     />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item>
                                                    <CheckBoxCustom checked={this.state.priceChecked}
                                                                    onChange={(e) => {
                                                                      this.setState({priceChecked: !this.state.priceChecked,
                                                                                     priceDisabled: !this.state.priceDisabled},
                                                                        () => {
                                                                          if (this.state.priceChecked === true) {
                                                                            this.handleChange('5000000', 'price');
                                                                          } else {
                                                                            this.handleChange('', 'price');
                                                                          }
                                                                      });
                                                                      console.log(this.state.priceDisabled);
                                                                    }}
                                                                    label={'5000000'}
                                                                    label_id={'admin.title.suggested_price'}
                                                    />
                                                </Form.Item>
                                            </Col>
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
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                                <Form.Item label="Peso de la carga:">
                                                    <TextInputCustom value={this.state.load_weight}
                                                                     placeholder="peso"
                                                                     onChange={(e) => this.handleChange(e.target.value, 'load_weight')}
                                                                     required
                                                                     label_id={'admin.title.weight'}/>
                                                </Form.Item>
                                            </Col>
                                        <Col span={12}>
                                            <Form.Item label="Volúmen de la carga:">
                                                <TextInputCustom value={this.state.load_volume} 
                                                                 placeholder="volúmen"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'load_volume')}
                                                                 label_id={'admin.title.volume'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                                <Form.Item label="Dice contener:">
                                                    <TextInputCustom value={this.state.description}
                                                                     placeholder="dice contener"
                                                                     onChange={(e) => this.handleChange(e.target.value, 'description')}
                                                                     required
                                                                     label_id={'admin.title.description'}/>
                                                </Form.Item>
                                            </Col>
                                        <Col span={12}>
                                            <Form.Item label="Observaciones:">
                                                <TextInputCustom value={this.state.note} placeholder="observaciones"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'note')}
                                                                 label_id={'admin.title.note'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={24}>
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
                                            <Col span={12}>
                                                <Form.Item label="Tipo de empaque">
                                                    <SelectInputCustom value={this.state.packing}
                                                                       placeholder="tipo de empaque"
                                                                       style={{width: '100%'}} onChange={(e) => {
                                                        this.handleChange(e, 'packing')
                                                    }}
                                                                       options={this.state && this.state.packing_types &&

                                                                       this.state.packing_types.map((item) => {
                                                                           return <Option
                                                                               value={item.name}>{item.name}</Option>
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
                                                <Form.Item label="nombre del responsable de la carga:">
                                                  <TextInputCustom value={this.state.contact_name}
                                                                   placeholder="nombre del responsable"
                                                                   onChange={(e) => this.handleChange(e.target.value, 'contact_name')}
                                                                   required
                                                                   label_id={'admin.title.contact_name'}/>
                                                </Form.Item>
                                            </Col>
                                        <Col span={12}>
                                            <Form.Item label="Teléfono del responsable de la carga:">
                                              <TextInputCustom value={this.state.contact} 
                                                               placeholder="tel del responsable"
                                                               onChange={(e) => this.handleChange(e.target.value, 'contact')}
                                                               required
                                                               label_id={'admin.title.contact_phone'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    {assign &&
                                    <div>
                                        <Row gutter={10}>
                                            <Col span={24}>

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
                                    </div>

                                    }

                                    <Row>
                                        <Col span={24}>
                                            <Form.Item wrapperCol={{span: 24}}>
                                                <SecondaryButton htmlType={"submit"} message_id={"general.add"}
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
                <Modal
                    title="Añade metodo de pago"
                    visible={this.state.visible}
                    cancelText={'Cancelar'}
                    style={{width: '100%'}}
                    image={'smartphone.svg'}
                    body={
                        <div>
                            <Row type="flex" style={{textAlign: 'center', justifyContent: 'center'}}>
                                <h1>Añade método de pago</h1>

                            </Row>

                            <Row style={{marginTop: '10px'}}>
                                <Col span={24}>
                                    <CreditCardInput
                                        containerStyle={{width: '100%', height: '40px'}}
                                        fieldStyle={{height: '40px'}}
                                        inputStyle={{height: '40px', border: '13px'}}
                                        cardNumberInputProps={{
                                            value: this.state.number,
                                            onChange: (e) => this.handleChange(e.target.value, 'card_number')
                                        }}
                                        cardExpiryInputProps={{
                                            value: this.state.number,
                                            onChange: (e) => this.handleChange(e.target.value, 'expiration')
                                        }}
                                        cardCVCInputProps={{
                                            value: this.state.number,
                                            onChange: (e) => this.handleChange(e.target.value, 'cvv')
                                        }}
                                        fieldClassName="input"
                                        customTextLabels={{
                                            invalidCardNumber: 'El número de la tarjeta es inválido',
                                            expiryError: {
                                                invalidExpiryDate: 'La fecha de expiración es inválida',
                                                monthOutOfRange: 'El mes de expiración debe estar entre 01 y 12',
                                                yearOutOfRange: 'El año de expiración no puede estar en el pasado',
                                                dateOutOfRange: 'La fecha de expiración no puede estar en el pasado'
                                            },
                                            invalidCvc: 'El código de seguridad es inválido',
                                            invalidZipCode: 'El código postal es inválido',
                                            cardNumberPlaceholder: 'Número de tarjeta',
                                            expiryPlaceholder: 'MM/AA',
                                            cvcPlaceholder: 'CVV',
                                            zipPlaceholder: 'C.P.'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <PrimaryButton message_id={'page.add'}
                                           onClick={() => this.handleAddPaymentMethod()}
                                           style={{marginTop: '20px', width: '100% '}}/>

                        </div>
                    }
                />

            </LayoutWrapper>
        );
    }
}
