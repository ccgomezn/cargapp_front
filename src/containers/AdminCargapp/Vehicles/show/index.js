import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { getVehicle, getUsers, getDocumentTypes, getVehicleTypes } from '../../../../helpers/api/adminCalls.js';

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
    axios.all([getVehicle(this.props.match.params.id), getUsers(), getDocumentTypes(), getVehicleTypes()])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }

        let data_vehicle_type = this.transformDataToMap(responses[3].data, 'name')
        let data_owner_type = this.transformDataToMap(responses[2].data, 'name')
        let data_users = this.transformDataToMap(responses[1].data, 'email')
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
    this.props.history.push('/admin/vehicles')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/vehicles' />
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
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Marca">
                      <p>{this.state.brand}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Modelo">
                      <p>{this.state.model}</p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Año del modelo">
                      <p>{this.state.model_year}</p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Color">
                      <p>{this.state.color}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Placa">
                      <p>{this.state.plate}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Chasis">
                      <p>{this.state.chassis}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Nombre del dueño del vehiculo">
                      <p>{this.state.owner_vehicle}</p>
                    </Form.Item>
                  </Col>

                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Tipo de documento del dueño del vehiculo">
                      <p>{this.state.owner_document_type}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Número de documento del dueño del vehiculo">
                      <p>{this.state.owner_document_id}</p>
                    </Form.Item>
                  </Col>

                </Row>


                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Tipo de vehiculo">
                      <p>{this.state.vehicle_type}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Usuario">
                      <p>{this.state.user}</p>
                    </Form.Item>
                  </Col>

                </Row>


                

                <Row gutter={10}>
                  
                  <Col span={12}>
                    <Form.Item label="Estado">
                      <p>{this.state.active}</p>
                    </Form.Item>
                  </Col>

                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item wrapperCol={{ span: 24 }}>
                      <PrimaryButton message_id={"general.back"} style={{ width: '200px' }} onClick={() => this.goBack()} />
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
