import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col, Form, Card, Select, message } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import MapContainer from "../../../../components/maps/map";
import { midPointLatLong } from "../../../../helpers/geolocalization";
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import { transformInputData } from "../../../../helpers/utility";
import DatePickerCustom from "../../../../components/custom/input/date";
import TimePickerCustom from "../../../../components/custom/input/time";
import { checkUser, getActiveUsers, getMineUser, postUserPaymentMethod } from "../../../../helpers/api/users";
import { getActiveCompanies } from "../../../../helpers/api/companies";
import { postService } from "../../../../helpers/api/services";
import { getActiveVehicles, getActiveVehicleTypes } from "../../../../helpers/api/vehicles";
import { getActiveCities } from "../../../../helpers/api/locations";
import { getActiveModels, getStatusOfModel, findParameters } from "../../../../helpers/api/internals";
import Modal from '../../../../components/feedback/modal';
import { getActivePaymentMethods } from "../../../../helpers/api/payments";
import CreditCardInput from "react-credit-card-input";
import CheckBoxCustom from "../../../../components/custom/input/checkBox";
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import AutocompleteCustom from "../../../../components/custom/input/autocomplete";

require('dotenv').config();
const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';
const { Option } = Select;

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
      visible: false,
      origin_address: '',
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
        this.setState({ visible: false });
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

  findByKeyValue(data, key, value) {
    let object = -1;

    data.map((item) => {
      if (item[key] == value) {
        object = item;
      }
    });
    return object;
  }

  componentWillMount() {
    const { assign } = this.props;
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
          console.log(responses[1].data);
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
            programmed_date: moment(),
            programmed_time: moment(),
            origin_latitude: 4.710989,
            origin_longitude: -74.072090,
            destination_latitude: 4.710989,
            destination_longitude: -74.072090,
            center: { lat: 4.710989, lng: -74.072090 },
            payment_methods: responses[6].data,
            packing_types: responses[7].data.parameters,
            priceChecked: false,
            priceDisabled: false,
          });
        });
    });
  }

  handleChange(value, type) {
    if (type === 'user_driver_id') {
      this.setState({ vehicles: this.state.vehicles_full[transformInputData(value)] });
    }
    console.log(value);
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

  handleSelect = (address, type) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        if (type === 'origin') {
          this.setState({
            origin_address: address,
            origin_latitude: latLng.lat,
            origin_longitude: latLng.lng,
          })
        } else {
          this.setState({
            destination_address: address,
            destination_latitude: latLng.lat,
            destination_longitude: latLng.lng,
          })
        }
      })
      .catch(error => console.error('Error', error));
  };

  handlePost() {
    checkUser().then((response) => {
      let payment = false;

      response.data.forEach(model => {
        if (model.name === 'user_payment_methods') {
          payment = model.permission
        }
      });

      let programmedDatetime = '';
      if (this.state.programmed_date) {
        let programmedDate = this.state.programmed_date.toISOString().split('T')[0];
        let programmedTime = this.state.programmed_time.toString().split(' ');
        programmedTime = programmedTime[programmedTime.length - 2];

        programmedDatetime = this.state.programmed_time ? 
          `${programmedDate} ${programmedTime}` : programmedDate;
      }
      
      getMineUser().then((response) => {
        let data = {
          service: {
            name: this.state.name,
            origin: this.state.origin,
            origin_city_id: transformInputData(this.state.origin_city_id),
            origin_city_lat: transformInputData(this.state.origin_city_lat),
            origin_city_lng: transformInputData(this.state.origin_city_lng),
            origin_city_radius:transformInputData(this.state.origin_city_radius),
            origin_address: this.state.origin_address,
            origin_longitude: this.state.origin_longitude,
            origin_latitude: this.state.origin_latitude,
            destination: this.state.destination,
            destination_city_id: transformInputData(this.state.destination_city_id),
            destination_city_lat: transformInputData(this.state.destination_city_lat),
            destination_city_lng: transformInputData(this.state.destination_city_lng),
            destination_city_radius:transformInputData(this.state.destination_city_radius),
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
            vehicle_type_id: this.state.vehicle_type_id ? transformInputData(this.state.vehicle_type_id) : 8,
            statu_id: 49,
            expiration_date: this.state.expiration_date,
            datetime: programmedDatetime,
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
          this.setState({ redirect: true })
        })
      })
    });
  }

  handleSearchLocation(city_id, address, type) {
    let city = this.state.cities_proc[city_id];
    let address_full = encodeURIComponent(address + ',' + city);
    axios.post(encodeURI('https://maps.googleapis.com/maps/api/geocode/json?region=CO' +
      '&address=' + address_full + '' + '&key=' + process.env.REACT_APP_GOOLE_MAPS_API_KEY))
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
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;
    const { assign, admin, generator } = this.props;

    if (redirect) {
      if (admin) {
        return <Redirect to='/admin/services' />
      } else if (generator) {
        return <Redirect to='/generator/services' />
      } else {
        return <Redirect to='/admin/services' />
      }
    }

    let originOptions;
    let destinationOptions;
    if (this.state.origin_city_id) {
      originOptions = {
        location: new window.google.maps.LatLng(this.state.origin_city_lat, this.state.origin_city_lng),
        radius: this.state.origin_city_radius / 2,
      }
    } 
    if (this.state.destination_city_id) {
      destinationOptions = {
        location: new window.google.maps.LatLng(this.state.destination_city_lat, this.state.destination_city_lng),
        radius: this.state.destination_city_radius / 2,
      }
    }
    
    return (
      <LayoutWrapper style={{ paddingTop: 10 }}>
        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="services.title" />
                  </h1>
                </PageHeader>
              </Col>
            </Row>

            <Row style={rowStyle} gutter={10}>
              <Card className="cardContent" >

                <Col lg={12} md={24} sm={24} xs={24}>
                  <Row gutter={10}>
                    <Col span={24}>
                      <Col span={16}>
                        <Form.Item label="Origen">
                          <SelectInputCustom 
                            value={this.state.origin_city_id}
                            style={{ width: '100%', display: 'inline'}} 
                            onChange={(e) => {
                              this.handleChange(e, 'origin_city_id');
                              this.handleChange(e.label, 'origin');
                              
                              let pickedCity = this.findByKeyValue(this.state.cities, 'id', e.key);
                              this.setState({
                                origin_city_lat: pickedCity.lat, 
                                origin_city_lng: pickedCity.lon, 
                                origin_city_radius: pickedCity.radius / 2, 
                              });
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
                      <Col span={8} style={{marginTop: '40px'}}>
                        <span style={{fontSize: '18px', color:'#172158'}}>*</span>
                      </Col>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={24}>
                      <Col span={16}>
                        <AutocompleteCustom
                          value={this.state.origin_address}
                          onChange={(e) => {this.handleChange(e, 'origin_address')}}
                          onSelect={(s) => {this.handleSelect(s, 'origin')}}
                          searchOptions={originOptions}
                        />
                      </Col>
                      <Col span={8}>
                        <span style={{fontSize: '18px', color:'#172158'}}>*</span>
                      </Col>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={24}>
                      <Col span={16}>
                        <Form.Item label="Destino " style={{ marginTop: '5%' }}>
                          <SelectInputCustom value={this.state.destination_city_id}
                            style={{ width: '100%' }} onChange={(e) => {
                              this.handleChange(e, 'destination_city_id');
                              this.handleChange(e.label, 'destination');

                              let destCity = this.findByKeyValue(this.state.cities, 'id', e.key);
                              this.setState({
                                destination_city_lat: destCity.lat, 
                                destination_city_lng: destCity.lon, 
                                destination_city_radius: destCity.radius / 2, 
                              });
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
                      <Col span={8} style={{marginTop: '70px'}}>
                        <span style={{fontSize: '18px', color:'#172158'}}>*</span>
                      </Col>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={24}>
                      <Col span={16}>
                        {console.log(this.state.destination_address)}
                        <AutocompleteCustom
                          value={this.state.destination_address}
                          onChange={(e) => {this.handleChange(e, 'destination_address')}}
                          onSelect={(s) => {this.handleSelect(s, 'destination')}}
                          searchOptions={destinationOptions}
                        />
                      </Col>
                      <Col span={8}>
                        <span style={{fontSize: '18px', color:'#172158'}}>*</span>
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
                                label_id={'admin.title.latitude'} />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item label="Longitud origen">
                              <TextInputCustom value={this.state.origin_longitude}
                                placeholder="longitud origen"
                                onChange={(e) => this.handleChange(e.target.value, 'origin_longitude')}
                                required
                                label_id={'admin.title.longitude'} />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item label="Latitud destino">
                              <TextInputCustom value={this.state.destination_latitude}
                                placeholder="latitud destino"
                                onChange={(e) => this.handleChange(e.target.value, 'destination_latitude')}
                                required
                                label_id={'admin.title.latitude'} />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item label="Longitud destino">
                              <TextInputCustom value={this.state.destination_longitude}
                                placeholder="longitud destino"
                                onChange={(e) => this.handleChange(e.target.value, 'destination_longitude')}
                                required
                                label_id={'admin.title.longitude'} />
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
                      }} block style={{ height: 420 }} isFreight={false} />
                    </Col>
                  </Row>
                </Col>
              </Card>

            </Row>

            <Row style={rowStyle} gutter={10}>
              <Card className="cardContent" style={{ marginTop: '1%' }}>
                <Form>
                { admin &&
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
                              this.setState({
                                priceChecked: !this.state.priceChecked,
                                priceDisabled: !this.state.priceDisabled
                              },
                                () => {
                                  if (this.state.priceChecked === true) {
                                    this.handleChange('5000000', 'price');
                                  } else {
                                    this.handleChange('', 'price');
                                  }
                                });
                            }}
                            label={
                              <div style={{display: 'inline'}}>
                                <span>5000000 </span>
                                <span style={{fontWeight: 'normal', width: '20%'}}>
                                  Este valor sugerido se basa en 
                                  el promedio histórico de los costos de flete
                                  propuestos por nuestros generadores.
                                </span>
                              </div>
                            }
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
                              onChange={(e) => this.handleChange(e, 'expiration_date')} />
                          }
                        </Form.Item>
                      </Col>
                    </Col>
                  </Row>}
                  
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Fecha de despacho">
                        {
                          this.state &&
                          <DatePickerCustom
                            defaultValue={moment(moment(), dateFormat)}
                            format={dateFormat}
                            onChange={(e) => this.handleChange(e, 'programmed_date')} />
                        }
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Hora de despacho">
                        {
                          this.state &&
                          <TimePickerCustom
                            defaultValue={moment(moment(), timeFormat)}
                            format={timeFormat}
                            onChange={(e) => this.handleChange(e, 'programmed_time')} />
                        }
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Col span={23}>
                        <Form.Item label="Peso de la carga:">
                          <TextInputCustom 
                            type='number'
                            value={this.state.load_weight}
                            placeholder="Peso (tons)"
                            onChange={(e) => this.handleChange(e.target.value, 'load_weight')}/>
                        </Form.Item>
                      </Col>
                    </Col>

                    <Col span={12}>
                      <Col span={23}>
                        <Form.Item label="Volúmen de la carga:">
                          <TextInputCustom 
                            value={this.state.load_volume}
                            type='number'
                            placeholder="Volúmen (m3)"
                            onChange={(e) => this.handleChange(e.target.value, 'load_volume')}/>
                        </Form.Item>
                      </Col>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Col span={23}>
                        <Form.Item label="Dice contener:">
                            <TextInputCustom value={this.state.description}
                              placeholder="Descripción"
                              onChange={(e) => this.handleChange(e.target.value, 'description')}
                              required/>
                          </Form.Item>
                      </Col>
                      <Col span={1} style={{marginTop: '40px'}}>
                        <span style={{fontSize: '18px', color:'#172158'}}>*</span>
                      </Col>
                    </Col>

                    <Col span={12}>
                      <Col span={23}>
                        <Form.Item label="Observaciones:">
                          <TextInputCustom value={this.state.note} placeholder="Descripción"
                            onChange={(e) => this.handleChange(e.target.value, 'note')}/>
                        </Form.Item>
                      </Col>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={24}>
                      <Col span={12}>
                        <Col span={23}>
                          <Form.Item label="Vehículo">
                            <SelectInputCustom value={this.state.vehicle_type_id}
                              style={{ width: '100%' }} onChange={(e) => {
                                this.handleChange(e, 'vehicle_type_id')
                              }}
                              options={this.state && this.state.vehicle_types &&

                                this.state.vehicle_types.map((item) => {
                                  return <Option
                                    value={item.id}>{item.name}</Option>
                                })
                              }
                              label_id={'admin.title.vehicleType'}>
                            </SelectInputCustom>
                          </Form.Item>
                        </Col>
                      </Col>

                      <Col span={12}>
                        <Col span={23}>
                          <Form.Item label="Empaque">
                            <SelectInputCustom value={this.state.packing}
                              style={{ width: '100%' }} onChange={(e) => {
                                this.handleChange(e, 'packing')
                              }}
                              options={this.state && this.state.packing_types &&

                                this.state.packing_types.map((item) => {
                                  return <Option
                                    value={item.name}>{item.name}</Option>
                                })
                              }
                              label_id={'admin.title.packingType'}>
                            </SelectInputCustom>
                          </Form.Item>
                        </Col>
                      </Col>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Col span={23}>
                      <Form.Item label="Contacto directo del despacho:">
                        <TextInputCustom value={this.state.contact_name}
                          placeholder="Ingrese nombre del contacto"
                          onChange={(e) => this.handleChange(e.target.value, 'contact_name')}
                          required/>
                      </Form.Item>
                      </Col>
                      <Col span={1} style={{marginTop: '40px'}}>
                        <span style={{fontSize: '18px', color:'#172158'}}>*</span>
                      </Col>
                    </Col>

                    <Col span={12}>
                      <Col span={23}>
                        <Form.Item 
                          label="Teléfono del contacto:"
                          >
                          <TextInputCustom value={this.state.contact}
                            placeholder="Ingrese número de teléfono"
                            onChange={(e) => this.handleChange(e.target.value, 'contact')}
                            required
                            type='number'/>
                        </Form.Item>
                      </Col>
                      <Col span={1} style={{marginTop: '40px'}}>
                        <span style={{fontSize: '18px', color:'#172158'}}>*</span>
                      </Col>
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
                                style={{ width: '100%' }} onChange={(e) => {
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
                                style={{ width: '100%' }} onChange={(e) => {
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
                                style={{ width: '100%' }} onChange={(e) => {
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
                    </div>}
                    
                  <Row>
                    <Col span={24}>
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <PrimaryButton htmlType={"submit"} message_id={"services.create"}
                          style={{ width: '200px' }}
                          onClick={() => this.handlePost()} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Row>
          </Col>
        </Row>

        {/* <Modal
          title="Añade metodo de pago"
          visible={this.state.visible}
          cancelText={'Cancelar'}
          style={{ width: '100%' }}
          image={'smartphone.svg'}
          body={
            <div>
              <Row type="flex" style={{ textAlign: 'center', justifyContent: 'center' }}>
                <h1>Añade método de pago</h1>
              </Row>

              <Row style={{ marginTop: '10px' }}>
                <Col span={24}>
                  <CreditCardInput
                    containerStyle={{ width: '100%', height: '40px' }}
                    fieldStyle={{ height: '40px' }}
                    inputStyle={{ height: '40px', border: '13px' }}
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
                style={{ marginTop: '20px', width: '100% ' }} />

            </div>
          }
        />
 */}
      </LayoutWrapper>
    );
  }
}
