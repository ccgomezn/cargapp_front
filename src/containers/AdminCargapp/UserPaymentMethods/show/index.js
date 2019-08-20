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
import httpAddr from "../../../../helpers/http_helper"
import { get } from "../../../../helpers/httpRequest"
import { getUserPaymentMethod, getUsers, getPaymentMethods } from '../../../../helpers/api/adminCalls.js';

export default class UserPaymentMethodShow extends Component {


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
    axios.all([getUserPaymentMethod(this.props.match.params.id), getUsers(), getPaymentMethods()])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }


        let data_users = this.transformDataToMap(responses[1].data, 'email');
        let data_methods = this.transformDataToMap(responses[2].data, 'uuid');
        this.setState({
          email: responses[0].data.email,
          uuid: responses[0].data.uuid,
          token: responses[0].data.token,
          card_number: responses[0].data.card_number,
          expiration: responses[0].data.expiration,
          cvv: responses[0].data.cvv,
          observation: responses[0].data.observation,
          user: data_users[responses[0].data.user_id],
          payment_method: data_methods[responses[0].data.payment_method_id],
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
    this.props.history.push('/admin/user_payment_methods')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/user_payment_methods' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="user_payment_methods.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Email">
                      <p>{this.state.email}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Uuid">
                      <p>{this.state.uuid}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Token">
                      <p>{this.state.token}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Número de tarjeta">
                      <p>{this.state.card_number}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Fecha de expiración">
                      <p>{this.state.expiration}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Observación">
                      <p>{this.state.observation}</p>
                    </Form.Item>
                  </Col>

                </Row>


                <Row>
                  <Col span={12}>
                    <Form.Item label="Usuario">
                      <p>{this.state.user}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Método de pago">
                      <p>{this.state.payment_method}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row>

                  <Col span={12}>
                    <Form.Item label="Estado de activación">
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
