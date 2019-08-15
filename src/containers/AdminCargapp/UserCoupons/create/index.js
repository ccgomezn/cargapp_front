import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col, Input } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form, Select } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card, message } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import httpAddr from "../../../../helpers/http_helper"
import { get, post } from "../../../../helpers/httpRequest"

const { Option } = Select;

export default class UserCouponCreate extends Component {


  constructor(props) {
    super();
    this.state = {
      user_id: '',
      redirect: false
    }
  }
  getUsers() {
    return get(httpAddr + `/users`, true);
  }

  getCoupons() {
    return get(httpAddr + `/coupons/active`, true);
  }

  getCargappModels() {
    return get(httpAddr + `/cargapp_models/active`, true);
  }

  handleChange(value, type) {

    this.setState(
      {
        [type]: value
      }
    )
  }
  handlePost() {
    post(httpAddr + '/user_coupons',
      {
        user_coupon: {
          user_id: this.state.user_id,
          coupon_id: this.state.coupon_id,
          cargapp_model_id: this.state.cargapp_model_id,
          applied_item_id: this.state.applied_item_id,
          discount: this.state.discount,
          active: true,
        }

      }, true).then(() => {
        this.setState({ redirect: true })
      }).catch(error => {
        let errorObject = JSON.parse(JSON.stringify(error));

        message.warning(errorObject.message);
      });
  }



  componentWillMount() {
    axios.all([this.getUsers(), this.getCoupons(), this.getCargappModels()])
      .then((responses) => {

        this.setState({
          users: responses[0].data,
          coupons: responses[1].data,
          cargapp_models: responses[2].data,
        });

      })

  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/user_coupons' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="user_coupons.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
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
                    <Form.Item label="Cupon">
                      <Select value={this.state.coupon_id} placeholder="cupon" style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'coupon_id') }}>
                        {this.state && this.state.coupons &&
                          this.state.coupons.map((item) => {
                            return <Option value={item.id}>{item.name}</Option>
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Modelo cargapp">
                      <Select value={this.state.cargapp_model_id} placeholder="modelo cargapp" style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'cargapp_model_id') }}>
                        {this.state && this.state.cargapp_models &&
                          this.state.cargapp_models.map((item) => {
                            return <Option value={item.id}>{item.name}</Option>
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Descuento">
                      <Input type="number" value={this.state.discount} placeholder="descuento" onChange={(e) => this.handleChange(e.target.value, 'discount')} />
                    </Form.Item>
                  </Col>
                </Row>

                  <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Id de item">
                        <Input type="number" value={this.state.applied_item_id} placeholder="id de item" onChange={(e) => this.handleChange(e.target.value, 'applied_item_id')} />

                    </Form.Item>
                  </Col>
                  
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item wrapperCol={{ span: 24 }}>
                      <PrimaryButton message_id={"general.add"} style={{ width: '200px' }} onClick={() => this.handlePost()} />
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
