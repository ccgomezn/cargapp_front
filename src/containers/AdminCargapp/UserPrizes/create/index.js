import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form, Select, DatePicker, Input } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card, message } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import httpAddr from "../../../../helpers/http_helper"
import moment from 'moment';
import { get, post } from "../../../../helpers/httpRequest"

const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;

export default class UserPrizeCreate extends Component {


  constructor(props) {
    super();
    this.state = {
      user_id: '',
      prize_id: '',
      redirect: false
    }
  }
  getUsers() {
    return get(httpAddr + `/users`, true);
  }

  getPrizes() {
    return get(httpAddr + `/prizes/active`, true);
  }

  handleChange(value, type) {

    this.setState(
      {
        [type]: value
      }
    )
  }
  handlePost() {
    post(httpAddr + '/user_prizes',
      {
        user_prize: {
          user_id: this.state.user_id,
          prize_id: this.state.prize_id,
          point: this.state.point,
          expire_date: this.state.expire_date,
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
    axios.all([this.getUsers(), this.getPrizes()])
      .then((responses) => {

        this.setState({
          users: responses[0].data,
          prizes: responses[1].data,
          expire_date: moment(),
        });

      })

  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/user_prizes' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="users_prizes.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Usuario">
                      <Select value={this.state.user_id} placeholder="usuario"  style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'user_id') }}>
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
                  <Col span={12}>
                    <Form.Item label="Premio">
                      <Select value={this.state.prize_id} placeholder="rol" style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'prize_id') }}>
                        {this.state && this.state.prizes &&
                          this.state.prizes.map((item) => {
                            return <Option value={item.id}>{item.name}</Option>
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="Fecha de expiración">
                      {
                        this.state && this.state.expire_date &&
                        <DatePicker defaultValue={moment(this.state.expire_date, dateFormat)} format={dateFormat} onChange={(e) => this.handleChange(e, 'expire_date')} />
                      }
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Puntos">
                      <Input type="number" value={this.state.point} placeholder="puntos" onChange={(e) => this.handleChange(e.target.value, 'point')} required />
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
