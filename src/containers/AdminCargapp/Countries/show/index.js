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
import { getCountry } from "../../../../helpers/api/adminCalls"

export default class CountryShow extends Component {


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
    axios.all([getCountry(this.props.match.params.id)])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = 'Activo';
        } else {
          responses[0].data.active = 'Desactivado';
        }

        this.setState({
          name: responses[0].data.name,
          code: responses[0].data.code,
          description: responses[0].data.description,
          cioc: responses[0].data.cioc,
          currency_code: responses[0].data.currency_code,
          currency_name: responses[0].data.currency_name,
          currency_symbol: responses[0].data.currency_symbol,
          language_iso639: responses[0].data.language_iso639,
          language_name: responses[0].data.language_name,
          language_native_name: responses[0].data.language_native_name,
          image: responses[0].data.image,
          date_utc: responses[0].data.date_utc,
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
    this.props.history.push('/admin/countries')
  }


  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/countries' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="countries.title" />

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
                    <Form.Item label="Nombre">
                      <p>{this.state.name}</p>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Codigo">
                      <p>{this.state.code}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Descripción">
                      <p>{this.state.description}</p>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Cioc">
                      <p>{this.state.cioc}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Codigo de moneda">
                      <p>{this.state.currency_code}</p>
                    </Form.Item>
                  </Col>

                </Row>

                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Nombre de moneda">
                      <p>{this.state.currency_name}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Simbolo de moneda">
                      <p>{this.state.currency_symbol}</p>
                    </Form.Item>
                  </Col>

                </Row>


                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Lenguaje iso639">
                      <p>{this.state.language_iso639}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Nombre de lenguaje">
                      <p>{this.state.language_name}</p>
                    </Form.Item>
                  </Col>

                </Row>


                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Nombre nativo de lenguaje">
                      <p>{this.state.language_native_name}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Imagen">
                      <p>{this.state.image}</p>
                    </Form.Item>
                  </Col>

                </Row>


                <Row gutter={10}>
                  <Col span={12}>
                    <Form.Item label="Fecha UTC">
                      <p>{this.state.date_utc}</p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
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
