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
import {getPaymentMethod} from "../../../../helpers/api/payments";

export default class PaymentMethodShow extends Component {


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



  getUsers() {
    return get(httpAddr + `/users`, true);
  }

  componentWillMount() {
    axios.all([getPaymentMethod(this.props.match.params.id), this.getUsers()])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }


        let data_users = this.transformDataToMap(responses[1].data, 'email')
        this.setState({
          name: responses[0].data.name,
          uuid: responses[0].data.uuid,
          description: responses[0].data.description,
          app_id: responses[0].data.aap_id,
          secret_id: responses[0].data.secret_id,
          token: responses[0].data.token,
          email: responses[0].data.email,
          password: responses[0].data.password,
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
    this.props.history.push('/admin/payment_methods')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/payment_methods' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="payment_methods.title" />

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
                    <Form.Item label="Uuid">
                      <p>{this.state.uuid}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Descripción">
                      <p>{this.state.description}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Email">
                      <p>{this.state.email}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Id de aplicación">
                      <p>{this.state.app_id}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Id de secreto">
                      <p>{this.state.secret_id}</p>
                    </Form.Item>
                  </Col>

                </Row>


                <Row>
                  <Col span={12}>
                    <Form.Item label="Token">
                      <p>{this.state.token}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Usuario">
                      <p>{this.state.user}</p>
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
