import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card, message, Input } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Select } from 'antd';
import httpAddr from "../../../../helpers/http_helper"
import { get, put } from "../../../../helpers/httpRequest"

const { Option } = Select;
export default class UserChallengeEdit extends Component {


  constructor(props) {
    super();
    this.state = {
      redirect: false
    }
  }

  getMainData() {
    return get(httpAddr + `/user_challenges/` + this.props.match.params.id, true)
  }
  getUsers() {
    return get(httpAddr + `/users`, true);
  }

  getChallenges() {
    return get(httpAddr + `/challenges/active`, true);
  }
  componentWillMount() {
    console.log(this.props);
    axios.all([this.getMainData(), this.getUsers(), this.getChallenges()])
      .then((responses) => {


        this.setState({
          users: responses[1].data,
          challenges: responses[2].data,
          user_id: responses[0].data.user_id,
          challenge_id: responses[0].data.challenge_id,
          position: responses[0].data.position,
          point: responses[0].data.point,
          active: responses[0].data.active,
        });
      }).catch(error => {
        let errorObject = JSON.parse(JSON.stringify(error));

        message.warning(errorObject.message);
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
    put(httpAddr + '/user_challenges/' + this.props.match.params.id,
      {
        user_challenge: {
          user_id: this.state.user_id,
          challenge_id: this.state.challenge_id,
          position: this.state.position,
          point: this.state.point,
          active: this.state.active,
        }

      }, true).then(() => {
        this.setState({ redirect: true })
      }).catch(error => {
        let errorObject = JSON.parse(JSON.stringify(error));

        message.warning(errorObject.message);
      });
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
                <Row gutter={10}>
                  <Col span={24}>
                    <Form.Item label="Estado">
                      <Select value={this.state.active} placeholder="estado" style={{ width: 240 }} onChange={(e) => { this.handleChange(e, 'active') }}>
                        <Option value={true}>Activo</Option>
                        <Option value={false}>Desactivado</Option>

                      </Select>
                    </Form.Item>
                  </Col>

                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item wrapperCol={{ span: 24 }}>
                      <PrimaryButton message_id={"general.edit"} style={{ width: '200px' }} onClick={() => this.handlePut()} />
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
