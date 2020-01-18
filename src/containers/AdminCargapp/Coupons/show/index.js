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
import {getUsers} from "../../../../helpers/api/users";
import {getCoupon, getModels} from "../../../../helpers/api/internals";

export default class CouponShow extends Component {


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
    axios.all([getCoupon(this.props.match.params.id), getUsers(), getModels()])
      .then((responses) => {
        let data_users = this.transformDataToMap(responses[1].data, 'email')
        let data_models = this.transformDataToMap(responses[2].data, 'name')
        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }
        if (responses[0].data.is_porcentage) {
          responses[0].data.is_porcentage = 'Es porcentaje';
        } else {
          responses[0].data.is_porcentage = 'No es porcentaje';
        }
        this.setState({
          name: responses[0].data.name,
          code: responses[0].data.code,
          description: responses[0].data.description,
          is_porcentage: responses[0].data.is_porcentage,
          value: responses[0].data.value,
          quantity: responses[0].data.quantity,
          user: data_users[responses[0].data.user_id],
          cargapp_model: data_models[responses[0].data.cargapp_model_id],
          active: responses[0].data.active,
          company_id: responses[0].data.company_id,
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
    this.props.history.push('/admin/coupons')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/coupons' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="coupons.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Nombre">
                      <p>{this.state.name}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Codigo">
                      <p>{this.state.code}</p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Descripción">
                      <p>{this.state.description}</p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Valor">
                      <p>{this.state.value}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Cantidad">
                      <p>{this.state.quantity}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Usuario">
                      <p>{this.state.user}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Modelo cargapp">
                      <p>{this.state.cargapp_model}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Estado de activación">
                      <p>{this.state.active}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Es porcentaje?">
                      <p>{this.state.is_porcentage}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Id empresa">
                      <p>{this.state.company_id}</p>
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
