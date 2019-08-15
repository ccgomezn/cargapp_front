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
import { Select, Input } from 'antd';
import httpAddr from "../../../../helpers/http_helper"
import { get, put } from "../../../../helpers/httpRequest"

const { Option } = Select;
export default class ChallengeEdit extends Component {


  constructor(props) {
    super();
    this.state = {
      redirect: false
    }
  }

  getMainData() {
    return get(httpAddr + `/challenges/` + this.props.match.params.id)
  }

  getUsers() {
    return get(httpAddr + `/users`)
  }



  componentWillMount() {
    axios.all([this.getMainData(), this.getUsers()])
      .then((responses) => {
        console.log(responses[0].data.point)
        this.setState({
          users: responses[1].data,
          name: responses[0].data[0].name,
          body: responses[0].data[0].body,
          point: responses[0].data[0].point,
          user_id: responses[0].data[0].user_id,
          active: responses[0].data[0].active,
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
  handlePut() {
    const formData = new FormData();
    formData.append('challenge[name]', this.state.name)
    formData.append('challenge[body]', this.state.body)
    if(this.state.image != null){
      formData.append('challenge[image]', this.state.image, this.state.image.name)
    }
    formData.append('challenge[point]', this.state.point)
    formData.append('challenge[user_id]', this.state.user_id)
    formData.append('challenge[active]', this.state.active)

      put(httpAddr + '/challenges/' + this.props.match.params.id,formData).then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/challenges' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start">
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="challenges.title" />

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
                        <Input value={this.state.name} placeholder="nombre" onChange={(e) => this.handleChange(e.target.value, 'name')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Descripción del desafio">
                        <Input value={this.state.body} placeholder="descripción del desafio" onChange={(e) => this.handleChange(e.target.value, 'body')} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Imágen">
                        <input type="file" onChange={(e) => this.handleChange(e.target.files[0], 'image')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Puntos">
                        <Input type="number" value={this.state.point} placeholder="puntos" onChange={(e) => this.handleChange(e.target.value, 'point')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Usuario">
                        <Select value={this.state.user_id} placeholder="usuario" style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'user_id') }} >
                          {this.state && this.state.users &&

                            this.state.users.map((item) => {
                              return <Option value={item.id}>{item.email}</Option>
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>

                  </Row>
                  <Row gutter={10}>
                    <Col span={24}>
                      <Form.Item label="Estado">
                        <Select required value={this.state.active} placeholder="estado" style={{ width: 120 }} onChange={(e) => { this.handleChange(e, 'active') }}>
                          <Option value={true}>Activo</Option>
                          <Option value={false}>Desactivado</Option>

                        </Select>
                      </Form.Item>
                    </Col>

                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <PrimaryButton htmlType={"submit"} message_id={"general.edit"} style={{ width: '200px' }} onClick={() => this.handlePut()} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>


            </Row>

          </Col>
        </Row>




      </LayoutWrapper>
    );
  }
}
