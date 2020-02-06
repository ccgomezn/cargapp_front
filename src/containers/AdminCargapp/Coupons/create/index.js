import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form, Select} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card, Checkbox} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import moment from 'moment';
import {getActiveUsers,getMineUser} from "../../../../helpers/api/users"
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import {findParameters, getActiveModels, postCoupon} from "../../../../helpers/api/internals";
import {getCompanies} from "../../../../helpers/api/companies";
import {transformInputData} from "../../../../helpers/utility";

const {Option} = Select;

export default class CouponCreate extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false,
            birth_date: moment(),
        }
    }

    componentWillMount() {
        axios.all([getActiveUsers(), getActiveModels(), findParameters('coupon_category'), getCompanies()])
            .then((responses) => {     
              this.setState({
                  users: responses[0].data,
                  cargapp_models: responses[1].data,
                  categories: responses[2].data.parameters,
                  companies: responses[3].data,
              });
            })
    }


    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        )
    }


    handlePost() {
        const cargapp_model_id = transformInputData(this.state.cargapp_model_id);
        const category = transformInputData(this.state.category);
        const company_id = transformInputData(this.state.company_id);
        
        getMineUser().then((response) => {
          const formData = new FormData();
          formData.append('coupon[name]', this.state.name);
          formData.append('coupon[code]', this.state.code);
          formData.append('coupon[description]', this.state.description);
          formData.append('coupon[is_porcentage]', this.state.is_porcentage);
          formData.append('coupon[value]', this.state.value);
          formData.append('coupon[quantity]', this.state.quantity);
          formData.append('coupon[user_id]', response.data.user.id);
          formData.append('coupon[cargapp_model_id]', cargapp_model_id);
          formData.append('coupon[active]', true);
          formData.append('coupon[company_id]', company_id);
          formData.append('coupon[category]', category);
          
          if (this.state.image != null) {
            formData.append('coupon[image]', this.state.image, this.state.image.name);
          }
          
          postCoupon(formData).then(() => {
              this.setState({redirect: true})
          })
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/coupons'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="coupons.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Form>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Nombre">
                                                <TextInputCustom value={this.state.name} placeholder="nombre"
                                                                 label_id={'admin.title.name'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'name')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Code">
                                                <TextInputCustom value={this.state.code} placeholder="codigo"
                                                                 label_id={'admin.title.code'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'code')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Descripción">
                                                <TextInputCustom value={this.state.description}
                                                                 placeholder="descripción"
                                                                 label_id={'admin.title.description'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'description')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Valor">
                                                <TextInputCustom type="number" value={this.state.value}
                                                                 placeholder="valor"
                                                                 label_id={'admin.title.value'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'value')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Cantidad">
                                                <TextInputCustom type="number" value={this.state.quantity}
                                                                 placeholder="cantidad"
                                                                 label_id={'admin.title.quantity'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'quantity')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Es porcentaje?">

                                                <Checkbox value={this.state.is_porcentage}
                                                          onChange={(e) => this.handleChange(e.target.checked, 'is_porcentage')}></Checkbox>
                                            </Form.Item>

                                        </Col>
                                    </Row>

                                    <Row gutter={10}>
                                      <Col span={12}>
                                        <Form.Item label="Categoria">
                                            <SelectInputCustom value={this.state.category}
                                                                placeholder="Categoria"
                                                                style={{width: '100%'}} onChange={(e) => {
                                                                    this.handleChange(e, 'category')
                                                                }}
                                                                options={this.state && this.state.categories &&
                                                                this.state.categories.map((item) => {
                                                                    return <Option
                                                                        value={item.code}>{item.name}</Option>
                                                                })
                                                                }
                                                                label_id={'admin.title.category'}>
                                            </SelectInputCustom>
                                        </Form.Item>
                                      </Col>
                                      <Col span={12}>
                                        <Form.Item label="Compañia">
                                            <SelectInputCustom value={this.state.company_id} placeholder="compañia"
                                                                style={{width: '100%'}} onChange={(e) => {
                                                this.handleChange(e, 'company_id')
                                            }}
                                                                options={this.state && this.state.companies &&
                                                                this.state.companies.map((item) => {
                                                                  if (item.name != null) {
                                                                    return <Option value={item.id}>{item.name}</Option>
                                                                  }
                                                                })
                                                                }
                                                                label_id={'admin.title.company'}>

                                            </SelectInputCustom>
                                        </Form.Item>
                                      </Col>
                                    </Row>

                                    <Row gutter={10}>
                                      <Col span={12}>
                                          <Form.Item label="Modelo cargapp">
                                              <SelectInputCustom value={this.state.cargapp_model_id}
                                                                  placeholder="reto"
                                                                  style={{width: '100%'}} onChange={(e) => {
                                                  this.handleChange(e, 'cargapp_model_id')
                                              }}
                                                                  options={this.state && this.state.cargapp_models &&
                                                                  this.state.cargapp_models.map((item) => {
                                                                      return <Option
                                                                          value={item.id}>{item.name}</Option>
                                                                  })
                                                                  }
                                                                  label_id={'admin.title.model'}>

                                              </SelectInputCustom>
                                          </Form.Item>
                                      </Col>
                                    </Row>
                                    
                                    <Row gutter={10}>
                                      <Col span={12}>
                                        <Form.Item label="Imagen">
                                          <div style={{position: 'relative'}}>
                                              <input type="file"
                                                      id="contained-button-file"
                                                      onChange={(e) => this.handleChange(e.target.files[0], 'image')}
                                                      style={{
                                                          position: 'relative',
                                                          textAlign: 'right',
                                                          opacity: 0,
                                                          zIndex: 2
                                                      }}/>
                                              <label htmlFor="contained-button-file" style={{
                                                  position: 'absolute',
                                                  top: '0px',
                                                  left: '0px',
                                                  zIndex: 1
                                              }}>
                                                  <PrimaryButton message_id={'widget.load'}/>
                                                  {this.state.image && this.state.image.name}
                                              </label>
                                          </div>
                                        </Form.Item>
                                      </Col>
                                    </Row>

                                    <Row>
                                        <Col span={24}>

                                            <Form.Item wrapperCol={{span: 24}}>
                                                <PrimaryButton htmlType={"submit"} message_id={"general.add"}
                                                               style={{width: '200px'}}
                                                               onClick={() => this.handlePost()}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>


                        </Row>

                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}
