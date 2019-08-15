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
import { get } from "../../../../helpers/httpRequest"

export default class ParameterShow extends Component {


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
    return get(httpAddr + `/parameters/` + this.props.match.params.id, true)
  }
  getUsers() {
    return get(httpAddr + `/users/`, true);
  }

  getCargappModel(id) {
    return get(httpAddr + `/cargapp_models/` + id, true);
  }

  componentWillMount() {
    axios.all([this.getMainData()])
      .then((responses) => {
        axios.all([this.getUsers(), this.getCargappModel(responses[0].data.cargapp_model_id)])
          .then((responses_full) => {
            if (responses[0].data.active){
              responses[0].data.active = 'Activo';
            }else{
              responses[0].data.active = 'Desactivado';
            }
            console.log()
            for (var i = 0; i < responses_full[0].data.length; i++) {
              
              if (responses_full[0].data[i].id === responses[0].data.user_id) {
                responses[0].data.user = responses_full[0].data[i].email;
                break;
              } 
            }
            
            this.setState({
              name: responses[0].data.name,
              code: responses[0].data.code,
              description: responses[0].data.description,
              user: responses[0].data.user,
              cargapp_model: responses_full[1].data.name,
              value: responses[0].data.value,
              active: responses[0].data.active,
            });
          })

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
    this.props.history.push('/dashboard/admin/parameters')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/parameters' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="roles.title" />

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
                    <Form.Item label="Código">
                      <p>{this.state.code}</p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Descripción">
                      <p>{this.state.description}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Valor">
                      <p>{this.state.value}</p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={24}>
                    <Form.Item label="Usuario">
                      <p>{this.state.user}</p>
                    </Form.Item>
                  </Col>

                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item label="Modelo">
                      <p>{this.state.cargapp_model}</p>

                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={24}>
                    <Form.Item label="Estado">
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
