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
import httpAddr from "../../../../helpers/http_helper"

export default class PrizeShow extends Component {


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
  getMainData() {
    return axios.get(httpAddr + `/prizes/` + this.props.match.params.id)
  }

  

 
  getUsers() {
    return axios.get(httpAddr + `/users`);
  }

  componentWillMount() {
    axios.all([this.getMainData(), this.getUsers()])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }

        
        let data_users = this.transformDataToMap(responses[1].data, 'email')
        this.setState({
          users: responses[1].data,
          name: responses[0].data.name,
          code: responses[0].data.code,
          image: responses[0].data.image,
          media: responses[0].data.media,
          point: responses[0].data.point,
          description: responses[0].data.description,
          body: responses[0].data.body,
          expire_date: responses[0].data.expire_date,
          user: data_users[responses[0].data.user_id],
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
    this.props.history.push('/dashboard/admin/prizes')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/prizes' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="prizes.title" />

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
                    <Form.Item label="Codigo">
                      <p>{this.state.code}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Imagen">
                      <a href={this.state.image}><IntlMessages id="general.download" /></a>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Media">
                      <a href={this.state.media}><IntlMessages id="general.download" /></a>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Puntos">
                      <p>{this.state.point}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Descripción">
                      <p>{this.state.description}</p>
                    </Form.Item>
                  </Col>

                </Row>


                <Row>
                  <Col span={12}>
                    <Form.Item label="Cuerpo">
                      <p>{this.state.body}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Fecha de expiración">
                      <p>{this.state.expire_date}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={12}>
                    <Form.Item label="Usuario">
                      <p>{this.state.user}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Estado de activación">
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
