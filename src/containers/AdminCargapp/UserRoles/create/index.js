import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form, Select } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card, message } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import httpAddr from "../../../../helpers/http_helper"
import { get, post } from "../../../../helpers/httpRequest"

const { Option } = Select;

export default class RoleCreate extends Component {


  constructor(props) {
    super();
    this.state = {
      user_id: '',
      role_id: '',
      redirect: false
    }
  }
  getUsers() {
    return get(httpAddr + `/users`, true);
  }

  getRoles() {
    return get(httpAddr + `/roles/active`, true);
  }

  handleChange(value, type) {

    this.setState(
      {
        [type]: value
      }
    )
  }
  handlePost() {
    post(httpAddr + '/user_roles',
      {
        user_role: {
          user_id: this.state.user_id,
          role_id: this.state.role_id,
          admin_id: 1,
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
    axios.all([this.getUsers(), this.getRoles()])
      .then((responses) => {

        this.setState({
          users: responses[0].data,
          roles: responses[1].data,
          user_id: responses[0].data[0].id,
          role_id: responses[1].data[0].id,
        });

      })

  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/user_roles' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="users_roles.title" />

                  </h1>
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Card className="cardContent" style={{ marginTop: '50px' }}>
                <Row gutter={10}>
                  <Col span={24}>
                    <Form.Item label="Usuario">
                      <Select value={this.state.user_id} placeholder="usuario"  style={{ width: 240 }} onChange={(e) => { this.handleChange(e, 'user_id') }}>
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
                    <Form.Item label="Rol">
                      <Select value={this.state.role_id} placeholder="rol" style={{ width: 240 }} onChange={(e) => { this.handleChange(e, 'role_id') }}>
                        {this.state && this.state.roles &&
                          this.state.roles.map((item) => {
                            return <Option value={item.id}>{item.name}</Option>
                          })
                        }
                      </Select>
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
