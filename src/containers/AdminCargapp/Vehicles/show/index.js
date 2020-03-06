import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form } from "antd";
import { Card } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import {getUsers} from "../../../../helpers/api/users";
import {
  getVehicle, 
  getVehicleTypes, 
  getVehicleDocumentsByVehicle} from "../../../../helpers/api/vehicles";
import {getDocumentTypes, getFilteredDocument} from "../../../../helpers/api/internals";
import SimpleImageSlider from "react-simple-image-slider";
import { TitleLabel, TitleDivider, SliderContainer, TextItemStyle, labelItemStyle } from './style.js';
import PrimaryButton from "../../../../components/custom/button/primary";

export default class VehicleShow extends Component {

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
    axios.all([getVehicle(this.props.match.params.id), 
                getUsers(), getDocumentTypes(), getVehicleTypes(),
                getVehicleDocumentsByVehicle(this.props.match.params.id),
                getFilteredDocument('VehiclePhotos'), 
                getFilteredDocument('VehicleDocuments')])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }

        let data_vehicle_type = this.transformDataToMap(responses[3].data, 'name');
        let data_owner_type = this.transformDataToMap(responses[2].data, 'name');
        let data_users = this.transformDataToMap(responses[1].data, 'email');
        let photosDocumentTypeId = this.transformDataToMap(responses[5].data, 'id');
        let possibleDocuments = responses[6].data;
        let vehicleFiles = responses[4].data;
        let vehiclePhotos = [];

        vehicleFiles.forEach(file => {
          if (photosDocumentTypeId[file.document_type_id]) {
            vehiclePhotos.push({url: file.file});
          }
        });

        this.setState({
          brand: responses[0].data.brand,
          model: responses[0].data.model,
          model_year: responses[0].data.model_year,
          color: responses[0].data.color,
          plate: responses[0].data.plate,
          chassis: responses[0].data.chassis,
          owner_vehicle: responses[0].data.owner_vehicle,
          owner_document_id: responses[0].data.owner_document_id,
          vehicle_type: data_vehicle_type[responses[0].data.vehicle_type_id],
          owner_document_type: data_owner_type[responses[0].data.owner_document_type_id],
          user: data_users[responses[0].data.user_id],
          active: responses[0].data.active,
          vehicle_photos: vehiclePhotos
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
    if (this.props.generator) {
      this.props.history.push('/generator/services');
    } else {
      this.props.history.push('/admin/vehicles');
    }
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;
    let sliderWidth = window.screen.width * 0.38;
    let sliderHeight = window.screen.height * 0.38;

    if (redirect) {
      if (this.props.generator) {
        this.props.history.push('/generator/services');
      } else {
      this.props.history.push('/admin/vehicles');
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
                    <IntlMessages id="vehicles.title" />
                  </h1>
                </PageHeader>
              </Col>
            </Row>

            <Row>
              <Card className="cardContent" style={{ marginTop: '45px' }}>
                
                <Row gutter={10}>
                  <Col span={14}>
                    <TitleLabel>Fotos del vehículo</TitleLabel>
                    <TitleDivider />

                    {this.state.vehicle_photos && this.state.vehicle_photos.length > 0 && 
                      <SliderContainer>
                        <SimpleImageSlider
                          width={sliderWidth}
                          height={sliderHeight}
                          images={this.state.vehicle_photos}
                        />
                      </SliderContainer>}
                  </Col>

                  <Col span={10}>
                    <TitleLabel>Detalles</TitleLabel>
                    <TitleDivider />
                    
                    <Row gutter={10} style={{marginTop: '10%'}}>
                      <Col span={12}>
                        <Form.Item label="Marca" style={labelItemStyle}>
                          <div class="ant-form-item-control" style={TextItemStyle}>
                            {this.state.brand}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Color" style={labelItemStyle}>
                          <div class="ant-form-item-control" style={TextItemStyle}>
                            {this.state.color}
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={10}>
                      <Col span={12}>
                        <Form.Item label="Modelo" style={labelItemStyle}>
                          <div class="ant-form-item-control" style={TextItemStyle}>
                            {this.state.model}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Año" style={labelItemStyle}>
                          <div class="ant-form-item-control" style={TextItemStyle}>
                            {this.state.model_year}
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={10}>
                      <Col span={12}>
                        <Form.Item label="Placa" style={labelItemStyle}>
                          <div class="ant-form-item-control" style={TextItemStyle}>
                            {this.state.plate}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="No. Chasis" style={labelItemStyle}>
                          <div class="ant-form-item-control" style={TextItemStyle}>
                            {this.state.chassis}
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Row gutter={10}>
                      <Col span={12}>
                        <Form.Item label="Tipo de vehículo" style={labelItemStyle}>
                          <div class="ant-form-item-control" style={TextItemStyle}>
                            {this.state.vehicle_type}
                          </div>
                        </Form.Item>
                      </Col>
                    </Row>

                  </Col>
                </Row>
              </Card>
              
              <Row>
                <Col span={5}>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <PrimaryButton message_id={"general.back"} style={{ width: '100%' }}
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
