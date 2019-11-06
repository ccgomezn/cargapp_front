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
import {getUsers} from "../../../../helpers/api/users";
import {getReport} from "../../../../helpers/api/internals";

export default class ReportShow extends Component {


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

  componentWillMount() {
    axios.all([getReport(this.props.match.params.id), getUsers()])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }


        let data_users = this.transformDataToMap(responses[1].data, 'email')
        this.setState({
          name: responses[0].data.name,
          origin: responses[0].data.origin,
          destination: responses[0].data.destination,
          cause: responses[0].data.cause,
          sense: responses[0].data.sense,
          novelty: responses[0].data.novelty,
          geolocation: responses[0].data.geolocation,
          image: responses[0].data.image,
          start_date: responses[0].data.start_date,
          end_date: responses[0].data.end_date,
          report_type: responses[0].data.report_type,
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
    this.props.history.push('/admin/reports')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/reports' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="reports.title" />

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
                    <Form.Item label="Origen">
                      <p>{this.state.origin}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Destino">
                      <p>{this.state.destination}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Causa">
                      <p>{this.state.cause}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Sentido">
                      <p>{this.state.sense}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Gravedad">
                      <p>{this.state.novelty}</p>
                    </Form.Item>
                  </Col>

                </Row>


                <Row>
                  <Col span={12}>
                    <Form.Item label="Geolocalización">
                      <p>{this.state.geolocation}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Imagen">
                      <a href={this.state.image}><IntlMessages id="general.download" /></a>
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                    <Col span={12}>
                      <Form.Item label="Fecha de inicio">
                        <p>{this.state.start_date}</p>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Fecha de fin">
                        <p>{this.state.end_date}</p>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                      <Col span={12}>
                        <Form.Item label="Tipo de reporte">
                          <p>{this.state.report_type}</p>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Usuario">
                          <p>{this.state.user}</p>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>

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
