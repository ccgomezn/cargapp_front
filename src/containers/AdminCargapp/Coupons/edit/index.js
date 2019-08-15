import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card, Checkbox } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Select, Input } from 'antd';
import httpAddr from "../../../../helpers/http_helper"
import { get, put } from "../../../../helpers/httpRequest"

const { Option } = Select;
export default class CouponEdit extends Component {


  constructor(props) {
    super();
    this.state = {
      redirect: false
    }
  }

  getMainData() {
    return get(httpAddr + `/coupons/` + this.props.match.params.id, true)
  }

  getUsers() {
    return get(httpAddr + `/users`, true)
  }

  getCargappModels() {
    return get(httpAddr + `/cargapp_models`, true)
  }



  componentWillMount() {
    axios.all([this.getMainData(), this.getUsers(), this.getCargappModels()])
      .then((responses) => {
        console.log(responses[0].data.point)
        this.setState({
          users: responses[1].data,
          cargapp_models: responses[2].data,
          code: responses[0].data.code,
          name: responses[0].data.name,
          description: responses[0].data.description,
          is_porcentage: responses[0].data.is_porcentage,
          value: responses[0].data.value,
          quantity: responses[0].data.quantity,
          cargapp_model_id: responses[0].data.cargapp_model_id,
          user_id: responses[0].data.user_id,
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
  handlePut() {
    put(httpAddr + '/coupons/' + this.props.match.params.id,
      {
        coupon: {
          name: this.state.name,
          code: this.state.code,
          description: this.state.description,
          is_porcentage: this.state.is_porcentage,
          value: this.state.value,
          quantity: this.state.quantity,
          user_id: this.state.user_id,
          cargapp_model_id: this.state.cargapp_model_id,
          active: this.state.active,
        }
      }, true).then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/coupons' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start">
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
                <Form>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Nombre">
                        <Input value={this.state.name} placeholder="nombre" onChange={(e) => this.handleChange(e.target.value, 'name')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Code">
                        <Input value={this.state.code} placeholder="codigo" onChange={(e) => this.handleChange(e.target.value, 'code')} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Descripción">
                        <Input value={this.state.description} placeholder="descripción" onChange={(e) => this.handleChange(e.target.value, 'description')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Valor">
                        <Input type="number" value={this.state.value} placeholder="valor" onChange={(e) => this.handleChange(e.target.value, 'value')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Cantidad">
                        <Input type="number" value={this.state.quantity} placeholder="cantidad" onChange={(e) => this.handleChange(e.target.value, 'quantity')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Es porcentaje?">

                        <Checkbox checked={this.state.is_porcentage} onChange={(e) => this.handleChange(e.target.checked, 'is_porcentage')}></Checkbox>
                      </Form.Item>

                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Usuario">
                        <Select value={this.state.user_id} placeholder="usuario" style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'user_id') }}>
                          {this.state && this.state.users &&

                            this.state.users.map((item) => {
                              return <Option value={item.id}>{item.email}</Option>
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Modelo cargapp">
                        <Select value={this.state.cargapp_model_id} placeholder="reto" style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'cargapp_model_id') }}>
                          {this.state && this.state.cargapp_models &&
                            this.state.cargapp_models.map((item) => {
                              return <Option value={item.id}>{item.name}</Option>
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
