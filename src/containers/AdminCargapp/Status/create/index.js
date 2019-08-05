import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form, Select, Input } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card, Checkbox } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import httpAddr from "../../../../helpers/http_helper"

const { Option } = Select;

export default class StatusCreate extends Component {


  constructor(props) {
    super();
    this.state = {
      redirect: false
    }
  }


  getUsers() {
    return axios.get(httpAddr + `/users`);
  }

  getCargappModels() {
    return axios.get(httpAddr + `/cargapp_models/active`);
  }

  handleChange(value, type) {

    this.setState(
      {
        [type]: value
      }
    )
  }
  handlePost() {
    axios.post(httpAddr + '/status',
      {
        statu: {
          name: this.state.name,
          code: this.state.code,
          description: this.state.description,
          user_id: this.state.user_id,
          cargapp_model_id: this.state.model_id,
          active: true,
        }

      }).then(() => {
        this.setState({ redirect: true })
      })
  }



  componentWillMount() {
    axios.all([this.getUsers(), this.getCargappModels()])
      .then((responses) => {

        this.setState({
          users: responses[0].data,
          models: responses[1].data,
        });

      })

  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/status' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="status.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Form>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Usuario">
                        <Select required value={this.state.user_id} placeholder="usuario" style={{ width: 240 }} onChange={(e) => { this.handleChange(e, 'user_id') }}>
                          {this.state && this.state.users &&

                            this.state.users.map((item) => {
                              return <Option value={item.id}>{item.email}</Option>
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item label="Modelo">
                        <Select required value={this.state.model_id} placeholder="modelo" style={{ width: 240 }} onChange={(e) => { this.handleChange(e, 'model_id') }}>
                          {this.state && this.state.models &&

                            this.state.models.map((item) => {
                              return <Option value={item.id}>{item.name}</Option>
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Nombre">
                        <Input value={this.state.name} placeholder="nombre" onChange={(e) => this.handleChange(e.target.value, 'name')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Código">
                        <Input value={this.state.code} placeholder="código" onChange={(e) => this.handleChange(e.target.value, 'code')} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={24}>
                      <Form.Item label="Descripción">
                        <Input value={this.state.description} placeholder="descripción" onChange={(e) => this.handleChange(e.target.value, 'description')} />
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
