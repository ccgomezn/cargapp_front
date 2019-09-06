import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form, Input } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card, Select } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import {getActiveUsers, postIntegration} from '../../../../helpers/api/adminCalls'
const { Option } = Select

export default class CargappIntegrationCreate extends Component {


  constructor(props) {
    super();
    this.state = {
      redirect: false
    }
  }
  

  componentWillMount() {
    axios.all([getActiveUsers()])
      .then((responses) => {

        this.setState({
          users: responses[0].data,
          user_id: responses[0].data[0].id,
        });

      })

  }

  handleChange(value, type) {

    this.setState(
      {
        [type]: value
      }
    )
  }
  handlePost() {
    postIntegration(
      {
        cargapp_integration: {
          name: this.state.name,
          description: this.state.description,
          provider: this.state.provider,
          code: this.state.code,
          url: this.state.url,
          url_provider: this.state.url_provider,
          url_production: this.state.url_production,
          url_develop: this.state.url_develop,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          phone: this.state.phone,
          pin: this.state.pin,
          token: this.state.token,
          app_id: this.state.app_id,
          client_id: this.state.client_id,
          api_key: this.state.api_key,
          user_id: this.state.user_id,
          active: true,
        }

      }).then(() => {
        this.setState({ redirect: true })
      })
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
                <Form>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Nombre">
                        <Input value={this.state.name} placeholder="nombre" onChange={(e) => this.handleChange(e.target.value, 'name')} required />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Código">
                        <Input value={this.state.code} placeholder="código" onChange={(e) => this.handleChange(e.target.value, 'code')} required />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Descripción">
                        <Input value={this.state.description} placeholder="descripción" onChange={(e) => this.handleChange(e.target.value, 'description')} required />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Proveedor">
                        <Input value={this.state.provider} placeholder="proveedor" onChange={(e) => this.handleChange(e.target.value, 'provider')} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Url">
                        <Input value={this.state.url} placeholder="url" onChange={(e) => this.handleChange(e.target.value, 'url')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Url de proveedor">
                        <Input value={this.state.url_provider} placeholder="url de proveedor" onChange={(e) => this.handleChange(e.target.value, 'url_provider')} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Url de producción">
                        <Input value={this.state.url_production} placeholder="url de producción" onChange={(e) => this.handleChange(e.target.value, 'url_production')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Url de desarrollo">
                        <Input value={this.state.url_develop} placeholder="url de desarrollo" onChange={(e) => this.handleChange(e.target.value, 'url_develop')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>

                    <Col span={12}>
                      <Form.Item label="Nombre de usuario">
                        <Input value={this.state.username} placeholder="nombre de usuario" onChange={(e) => this.handleChange(e.target.value, 'username')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Email">
                        <Input value={this.state.email} placeholder="email" onChange={(e) => this.handleChange(e.target.value, 'email')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Contraseña">
                        <Input type={'password'} secureTextEntry={true} value={this.state.password} placeholder="contraseña" onChange={(e) => this.handleChange(e.target.value, 'password')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Teléfono">
                        <Input value={this.state.phone} placeholder="teléfono" onChange={(e) => this.handleChange(e.target.value, 'phone')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Pin">
                        <Input value={this.state.pin} placeholder="pin" onChange={(e) => this.handleChange(e.target.value, 'pin')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Token">
                        <Input value={this.state.token} placeholder="token" onChange={(e) => this.handleChange(e.target.value, 'token')} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Id de aplicación">
                        <Input value={this.state.app_id} placeholder="id de aplicación" onChange={(e) => this.handleChange(e.target.value, 'app_id')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Id de cliente">
                        <Input value={this.state.client_id} placeholder="id de cliente" onChange={(e) => this.handleChange(e.target.value, 'client_id')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Llave de API">
                        <Input value={this.state.api_key} placeholder="llave de API" onChange={(e) => this.handleChange(e.target.value, 'api_key')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Usuario">
                        <Select value={this.state.user_id} placeholder="usuario" style={{ width: 240 }} onChange={(e) => { this.handleChange(e, 'user_id') }}>
                          {this.state && this.state.users &&

                            this.state.users.map((item) => {
                              return <Option value={item.id}>{item.email}</Option>
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>

                  </Row>

                  <Row>
                    <Col span={24}>
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <PrimaryButton htmlType={"submit"} message_id={"general.add"} style={{ width: '200px' }} onClick={() => this.handlePost()} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>


            </Row>

          </Col>
        </Row>




      </LayoutWrapper >
    );
  }
}
