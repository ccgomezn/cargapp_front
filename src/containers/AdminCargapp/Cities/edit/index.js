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
import { Select } from 'antd';
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";
import AreaInputCustom from "../../../../components/custom/input/area";
import { getCity, getStates, putCity } from "../../../../helpers/api/locations";


const { Option } = Select;
export default class StateEdit extends Component {


  constructor(props) {
    super();
    this.state = {
      redirect: false
    }
  }


  componentWillMount() {
    axios.all([getCity(this.props.match.params.id), getStates()])
      .then((responses) => {

        if (responses[0].data.active) {
          responses[0].data.active = true;
        } else {
          responses[0].data.active = false;
        }

        this.setState({
          name: responses[0].data.name,
          code: responses[0].data.code,
          lat: responses[0].data.lat,
          lon: responses[0].data.lon,
          radius: responses[0].data.radius,
          description: responses[0].data.description,
          states: responses[1].data,
          state_id: responses[0].data.state_id,
          active: responses[0].data.active
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

  handlePut() {
    const active = this.state.active !== undefined && this.state.active.key !== undefined ? this.state.active.key : this.state.active;

    putCity(this.props.match.params.id,
      {
        city: {
          name: this.state.name,
          code: this.state.code,
          lat: this.state.lat,
          lon: this.state.lng,
          radius: this.state.radius,
          description: this.state.description,
          state_id: this.state.country_id,
          active: active,
        }
      }).then(() => {
        this.setState({ redirect: true })
      })
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/admin/cities' />
    }
    return (

      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="cities.title" />

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
                        <TextInputCustom value={this.state.name} placeholder="nombre"
                          label_id={'admin.title.name'}
                          onChange={(e) => this.handleChange(e.target.value, 'name')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Código">
                        <TextInputCustom value={this.state.code} placeholder="código"
                          label_id={'admin.title.code'}
                          onChange={(e) => this.handleChange(e.target.value, 'code')} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Latitud">
                        <TextInputCustom value={this.state.lat} placeholder="Latitud"
                          onChange={(e) => this.handleChange(e.target.value, 'lat')}
                          label_id={'admin.title.lat'} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Longitud">
                        <TextInputCustom value={this.state.lng} placeholder="Longitud"
                          onChange={(e) => this.handleChange(e.target.value, 'lng')}
                          label_id={'admin.title.lng'} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Radio de ciudad">
                        <TextInputCustom value={this.state.radius} placeholder="Radio"
                          onChange={(e) => this.handleChange(e.target.value, 'radius')}
                          label_id={'admin.title.radius'} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Descripción">
                        <AreaInputCustom value={this.state.description}
                          placeholder="descripción"
                          label_id={'admin.title.description'}
                          onChange={(e) => this.handleChange(e.target.value, 'description')} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Estado - Ubicación">
                        <SelectInputCustom required value={this.state.state_id}
                          placeholder="estado"
                          style={{ width: 240 }} onChange={(e) => {
                            this.handleChange(e, 'state_id')
                          }}
                          options={this.state && this.state.states &&
                            this.state.states.map((item) => {
                              return <Option
                                value={item.id}>{item.name}</Option>
                            })}
                          label_id={'admin.title.state'}>
                        </SelectInputCustom>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={10}>
                    <Col span={12}>
                      <Form.Item label="Estado">
                        <SelectInputCustom required value={this.state.active}
                          placeholder="estado"
                          style={{ width: 120 }} onChange={(e) => {
                            this.handleChange(e, 'active')
                          }}
                          label_id={'admin.title.active'}
                          options={importantVariables.activeOptions.map((item) => {
                            return <Option
                              value={item.key}>{item.label}</Option>;
                          }
                          )}>
                        </SelectInputCustom>
                      </Form.Item>
                    </Col>

                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <PrimaryButton htmlType={"submit"} message_id={"general.edit"}
                          style={{ width: '200px' }}
                          onClick={() => this.handlePut()} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Row>

          </Col>
        </Row>

      </LayoutWrapper>
    )
      ;
  }
}

