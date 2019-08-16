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
import { postUserChallenge, getUsers, getChallenges } from '../../../../helpers/api/adminCalls.js';

const { Option } = Select;

export default class UserChallengeCreate extends Component {


  constructor() {
    super();
    this.state = {
      user_id: '',
      redirect: false
    }
  }

  handleChange(value, type) {

    this.setState(
      {
        [type]: value
      }
    )
  }
  handlePost() {
    postUserChallenge(
      {
        user_challenge: {
          user_id: this.state.user_id,
          challenge_id: this.state.challenge_id,
          position: this.state.position,
          point: this.state.point,
          active: true,
        }

      }).then(() => {
        this.setState({ redirect: true })
      }).catch(error => {
        let errorObject = JSON.parse(JSON.stringify(error));

        message.warning(errorObject.message);
      });
  }



  componentWillMount() {
    axios.all([getUsers(), getChallenges()])
      .then((responses) => {

        this.setState({
          users: responses[0].data,
          challenges: responses[1].data,
        });

      })

  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/user_challenges' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="user_challenges.title" />

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
                    <Form.Item label="Reto">
                      <Select value={this.state.challenge_id} placeholder="reto" style={{ width: '100%' }} onChange={(e) => { this.handleChange(e, 'challenge_id') }}>
                        {this.state && this.state.challenges &&
                          this.state.challenges.map((item) => {
                            return <Option value={item.id}>{item.name}</Option>
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Posición">
                      <Input type="number" value={this.state.position} placeholder="posición" onChange={(e) => this.handleChange(e.target.value, 'position')} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Puntos">
                      <Input type="number" value={this.state.point} placeholder="puntos" onChange={(e) => this.handleChange(e.target.value, 'point')} />
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
