import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import { Form, Input } from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import { Card } from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { postCountry } from "../../../../helpers/api/adminCalls"


export default class CountryCreate extends Component {


  constructor(props) {
    super();
    this.state = {
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
    postCountry(
      {
        country: {
          name: this.state.name,
          code: this.state.code,
          description: this.state.description,
          cioc: this.state.cioc,
          currency_code: this.state.currency_code,
          currency_name: this.state.currency_name,
          currency_symbol: this.state.currency_symbol,
          language_iso639: this.state.language_iso639,
          language_name: this.state.language_name,
          language_native_name: this.state.language_native_name,
          image: this.state.image,
          date_utc: this.state.date_utc,
          active: true,
        }

      }).then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/dashboard/admin/countries' />
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
                <Form>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Nombre">
                        <Input value={this.state.name} placeholder="nombre" onChange={(e) => this.handleChange(e.target.value, 'name')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Código">
                        <Input value={this.state.code} placeholder="código" onChange={(e) => this.handleChange(e.target.value, 'code')} />
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
                      <Form.Item label="Cioc">
                        <Input value={this.state.cioc} placeholder="cioc" onChange={(e) => this.handleChange(e.target.value, 'cioc')} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Código de moneda">
                        <Input value={this.state.currency_code} placeholder="código de moneda" onChange={(e) => this.handleChange(e.target.value, 'currency_code')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Nombre de moneda">
                        <Input value={this.state.currency_name} placeholder="nombre de moneda" onChange={(e) => this.handleChange(e.target.value, 'currency_name')} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Simbolo de moneda">
                        <Input value={this.state.currency_symbol} placeholder="simbolo de moneda" onChange={(e) => this.handleChange(e.target.value, 'currency_symbol')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Lenguaje iso 639">
                        <Input value={this.state.language_iso639} placeholder="lenguaje iso 639" onChange={(e) => this.handleChange(e.target.value, 'language_iso639')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Nombre de lenguaje">
                        <Input value={this.state.language_name} placeholder="nombre de lenguaje" onChange={(e) => this.handleChange(e.target.value, 'language_name')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Nombre nativo de lenguaje">
                        <Input value={this.state.language_native_name} placeholder="nombre nativo de lenguaje" onChange={(e) => this.handleChange(e.target.value, 'language_native_name')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Imagen">
                        <Input value={this.state.image} placeholder="Imagen" onChange={(e) => this.handleChange(e.target.value, 'image')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Fecha UTC">
                        <Input value={this.state.date_utc} placeholder="nombre nativo de lenguaje" onChange={(e) => this.handleChange(e.target.value, 'date_utc')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <PrimaryButton htmlType={"submit"} message_id={"general.add"} style={{ width: '200px' }} onClick={() => this.handlePost()} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>


            </Row>

          </Col>
        </Row>




      </LayoutWrapper >
    );
  }
}
