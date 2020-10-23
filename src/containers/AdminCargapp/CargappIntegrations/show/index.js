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
import {getIntegration} from "../../../../helpers/api/internals";

export default class CargappIntegrationShow extends Component {


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
    axios.all([getIntegration(this.props.match.params.id), getUsers()])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }
        let data_users = this.transformDataToMap(responses[1].data, 'email')
        this.setState({
          name: responses[0].data.name,
          description: responses[0].data.description,
          provider: responses[0].data.provider,
          code: responses[0].data.code,
          url: responses[0].data.url,
          url_provider: responses[0].data.url_provider,
          url_production: responses[0].data.url_production,
          url_develop: responses[0].data.url_develop,
          email: responses[0].data.email,
          username: responses[0].data.username,
          phone: responses[0].data.phone,
          pin: responses[0].data.pin,
          token: responses[0].data.token,
          app_id: responses[0].data.app_id,
          client_id: responses[0].data.client_id,
          api_key: responses[0].data.api_key,
          user_name: data_users[responses[0].data.user_id],
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
    this.props.history.push('/admin/cargapp_integrations')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/cargapp_integrations' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="cargappIntegrations.title" />

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
                    <Form.Item label="Descripción">
                      <p>{this.state.description}</p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Proveedor">
                      <p>{this.state.provider}</p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Codigo">
                      <p>{this.state.code}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Url">
                      <p>{this.state.url}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Url de proveedor">
                      <p>{this.state.url_provider}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Url de producción">
                      <p>{this.state.url_production}</p>
                    </Form.Item>
                  </Col>

                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Url de desarrollo">
                      <p>{this.state.url_develop}</p>
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
                    <Form.Item label="Nombre de usuario">
                      <p>{this.state.username}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Teléfono">
                      <p>{this.state.phone}</p>
                    </Form.Item>
                  </Col>

                </Row>


                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Pin">
                      <p>{this.state.pin}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Token">
                      <p>{this.state.token}</p>
                    </Form.Item>
                  </Col>

                </Row>


                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="ID de aplicación">
                      <p>{this.state.app_id}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="ID de cleinte">
                      <p>{this.state.client_id}</p>
                    </Form.Item>
                  </Col>

                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Llave de API">
                      <p>{this.state.api_key}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Usuario">
                      <p>{this.state.user_name}</p>
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
