import React, { Component } from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import basicStyle from '../../../../settings/basicStyle';
import { Form, Row, Col } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import MapContainer from "../../../../components/maps/map";
import ReportsSmallWidget from "../../../Dashboard/reportsmall/report-widget";
import IsoWidgetsWrapper from "../../../Dashboard/widgets-wrapper";
import { getActiveUsers, getUserLocation } from "../../../../helpers/api/users";
import { getActiveCompanies } from "../../../../helpers/api/companies";
import { getService, putService } from "../../../../helpers/api/services";
import { getActiveVehicles, getActiveVehicleTypes } from "../../../../helpers/api/vehicles";
import { getActiveCities } from "../../../../helpers/api/locations";
import { getActiveModels, getStatusOfModel, getActiveStatus } from "../../../../helpers/api/internals";
import { QontoConnector } from './style';
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

  classifyStatus(statusList, ignoredStatusIds = []) {
    let classifiedStatus = []

    statusList.forEach((status) => {
      if (!ignoredStatusIds.includes(status.id)) {
        classifiedStatus.push(status);
      }
    });
    return classifiedStatus;
  }

  sortStatus(statusList, statusOrderIds = {}) {
    let sortedStatus = new Array(statusList.length);
    let statusPosition;

    statusList.forEach(status => {
      statusPosition = statusOrderIds[status.id];
      sortedStatus[statusPosition] = status;
    });
    return sortedStatus;
  }

  componentWillMount() {
    getActiveModels().then(response => {
      let model_id = '';

      response.data.forEach(model => {
        if (model.code === 'SERVICE') {
          model_id = model.id
        }
      });

      axios.all([getService(this.props.match.params.id), getActiveUsers(), getActiveCities(),
      getActiveCompanies(), getActiveVehicles(), getActiveVehicleTypes(),
      getStatusOfModel(model_id), getActiveStatus()])
        .then((responses) => {
          if (responses[0].data.active) {
            responses[0].data.active = 'Activo';
          } else {
            responses[0].data.active = 'Desactivado';
          }

          // order status for service depending on role generator or admin
          let statusList = responses[7].data;
          let ignoredStatus = [49, 51, 52];
          let generatorIgnoredStatus = ignoredStatus.concat([50]);
          let serviceStatus = this.props.generator ? this.classifyStatus(statusList, generatorIgnoredStatus) :
                                this.classifyStatus(statusList, ignoredStatus);
          let OrderedStatusIds = {
            10: 0, 16: 1, 6: 2, 7: 3, 17: 4, 8: 5, 18: 6,
            9: 7, 19: 8, 11: 9, 50: 10
          }
          let orderedStatus = this.sortStatus(serviceStatus, OrderedStatusIds);
          if (this.props.generator) {
            orderedStatus[9].name = 'Viaje finalizado';
          }

          let startingServiceStatus = orderedStatus.slice(0, 5);
          let onProcessServiceStatus = orderedStatus.slice(5, orderedStatus.length);

          let data_users = this.transformDataToMap(responses[1].data, 'email');
          let data_cities = this.transformDataToMap(responses[2].data, 'name');
          let data_companies = this.transformDataToMap(responses[3].data, 'name');
          let data_vehicle_types = this.transformDataToMap(responses[5].data, 'name');
          let data_status = this.transformDataToMap(responses[6].data, 'name');
          let data_status_code = this.transformDataToMap(responses[6].data, 'code');
          let data_status_from_code = this.transformDataToMap(responses[6].data, 'id');

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
            load_weight: responses[0].data.load_weight,
            load_volume: responses[0].data.load_volume,
            packing: responses[0].data.packing,
            description: responses[0].data.description,
            note: responses[0].data.note,
            user: data_users[responses[0].data.user_id],
            company: data_companies[responses[0].data.company_id],
            user_driver: data_users[responses[0].data.user_driver_id],
            user_driver_id: responses[0].data.user_driver_id,
            user_receiver: data_users[responses[0].data.user_receiver_id],
            vehicle_type: data_vehicle_types[responses[0].data.vehicle_type_id],
            vehicle_id: responses[0].data.vehicle_id,
            status: data_status[responses[0].data.statu_id],
            statu_id: responses[0].data.statu_id,
            expiration_date: responses[0].data.expiration_date,
            contact_name: responses[0].data.contact_name,
            contact: responses[0].data.contact,
            report_type: responses[0].data.report_type,
            active: responses[0].data.active,
            status_code: data_status_code,
            status_from_code: data_status_from_code,
            starting_service_status: startingServiceStatus,
            process_service_status: onProcessServiceStatus,
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
            if (this.state.statu_id === 12 || !response.data[0]) {
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
            });

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
    } else if (this.props.vehicle_manager) {
      this.props.history.push('/vehicle_manager/drivers')
    } else {
      this.props.history.push('/admin/services')
    }
  }

  changeStatus(check, status) {
    this.setState(
      {
        [check]: true
      }
    );
    putService(this.props.match.params.id, { statu_id: status }).then(() => window.location.reload());
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;
    const { generator } = this.props;
    const { id } = this.props.match.params;
    
    let startingStatusIndex = -1;
    let onProcessStatusIndex = -1;
    if (this.state.starting_service_status && this.state.process_service_status && this.state.statu_id) {
      startingStatusIndex = this.state.starting_service_status.map(
                                  function (status) { return status.id; }).indexOf(this.state.statu_id);
      onProcessStatusIndex = this.state.process_service_status.map(
                                  function (status) { return status.id; }).indexOf(this.state.statu_id);
    }
    onProcessStatusIndex = (startingStatusIndex === -1 && onProcessStatusIndex === -1) ? 99 : onProcessStatusIndex;
    startingStatusIndex = (onProcessStatusIndex !== -1) ? 99 : startingStatusIndex;
    
    if (redirect) {
      return <Redirect to='/admin/services' />
    }

    return (
      <LayoutWrapper style={{ paddingTop: 10 }}>
        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>
                  <h1>
                    <IntlMessages id={"service.title"} />
                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Row style={rowStyle} gutter={10} justify="start">
                <Col lg={12} md={12} sm={12} xs={12} style={colStyle}>
                  <IsoWidgetsWrapper>
                    <div className="vehiclesOnTrack" style={{ height: 600 }}>
                      <ReportsSmallWidget
                        label={<IntlMessages id="widget.serviceDetail" />}>
                        <LayoutWrapper style={{ paddingTop: 10 }}>
                          <div className={'cardContent'}>
                            <Row>
                              <Col span={12}>
                                <Form.Item label="Origen" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.origin_city}, {this.state.origin_address}
                                  </div>
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item label="Destino" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.destination_city}, {this.state.destination_address}
                                  </div>
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row>
                              <Col span={12}>
                                <Form.Item label="Peso" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.load_weight && `${this.state.load_weight} tons` || 'No aplica'}
                                  </div>
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item label="Volumen" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.load_volume && `${this.state.load_volume} m3` || 'No aplica'}
                                  </div>
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row>
                              <Col span={12}>
                                <Form.Item label="Precio" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.price}
                                  </div>
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item label="Dice contener" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.description}
                                  </div>
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row>
                              <Col span={12}>
                                <Form.Item label="Distancia" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.distance}
                                  </div>
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item label="Duración" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.duration}
                                  </div>
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row>
                              <Col span={12}>
                                <Form.Item label="Conductor" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.user_driver_id ? <a href={generator ? '/generator/users/show/' +
                                      this.state.user_driver_id + '/' + id : '/admin/users/show/'
                                      + this.state.user_driver_id}>
                                      {'Ver conductor'}
                                    </a> : 'No tiene un conductor asignado'}
                                  </div>
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item label="Vehículo" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.user_driver_id ? <a href={generator ? '/generator/vehicles/show/' +
                                      this.state.vehicle_id + '/' : '/admin/vehicles/show/'
                                      + this.state.vehicle_id}>
                                      {'Ver vehículo'}
                                    </a> : 'No tiene un vehículo asignado'}
                                  </div>
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row>
                              <Col span={10}>
                                <Form.Item label="Nombre responsable" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.contact_name}
                                  </div>
                                </Form.Item>
                              </Col>
                              <Col span={2}></Col>
                              <Col span={10}>
                                <Form.Item label="Teléfono responsable" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.contact}
                                  </div>
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row>
                              <Col span={11}>
                                <Form.Item label="Observaciones" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.note || 'No hay observaciones'}
                                  </div>
                                </Form.Item>
                              </Col>
                              <Col span={1}></Col>
                              <Col span={10}>
                                <Form.Item label="Presentación" style={{ marginBottom: '15px' }}>
                                  <div class="ant-form-item-control" style={{ lineHeight: 1 }}>
                                    {this.state.packing || 'No aplica'}
                                  </div>
                                </Form.Item>
                              </Col>
                            </Row>

                          </div>
                        </LayoutWrapper>
                      </ReportsSmallWidget>
                    </div>
                  </IsoWidgetsWrapper>
                </Col>

                <Col lg={12} md={12} sm={12} xs={12} style={colStyle}>

                  <div style={{ width: '100%' }}>
                    <Row>
                      <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <MapContainer center={{
                          lat: 4.710989,
                          lng: -74.072090
                        }}
                          block style={{ height: 600 }}
                          markers={[this.state.origin_marker, this.state.destination_marker, this.state.user_location]}
                          directions={this.state.directions} />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>

              <Col span={24}>
                <IsoWidgetsWrapper>
                  <ReportsSmallWidget
                    label={<IntlMessages id="widget.startingStatusTitle" />}>
                    <LayoutWrapper>
                      <Col span={24}>
                        <Row>
                          <Col lg={24} md={24} sm={24} xs={24}>
                            {this.state.starting_service_status &&
                              <Stepper activeStep={startingStatusIndex} alternativeLabel connector={<QontoConnector />}>
                                {this.state.starting_service_status.map(status => (
                                  <Step key={status.id}>
                                    <StepLabel>{status.name}</StepLabel>
                                  </Step>
                                ))}
                              </Stepper>}
                          </Col>
                        </Row>
                      </Col>
                    </LayoutWrapper>
                  </ReportsSmallWidget>
                </IsoWidgetsWrapper>
              </Col>

              <Col span={24}>
                <IsoWidgetsWrapper>
                  <ReportsSmallWidget
                    label={<IntlMessages id="widget.onProcessStatusTitle" />}>
                    <LayoutWrapper>
                      <Col span={24}>
                        <Row>
                          <Col lg={24} md={24} sm={24} xs={24}>
                            {this.state.process_service_status &&
                              <Stepper activeStep={onProcessStatusIndex} alternativeLabel connector={<QontoConnector />}>
                                {this.state.process_service_status.map(status => (
                                  <Step key={status.id}>
                                    <StepLabel>{status.name}</StepLabel>
                                  </Step>
                                ))}
                              </Stepper>}
                          </Col>
                        </Row>
                      </Col>
                    </LayoutWrapper>
                  </ReportsSmallWidget>
                </IsoWidgetsWrapper>
              </Col>

              <Row>
                <Col span={24}>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <PrimaryButton message_id={"general.back"} style={{ width: '200px' }}
                      onClick={() => this.goBack()} />
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
