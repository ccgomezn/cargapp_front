import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Select} from 'antd';
import moment from 'moment';
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";
import DatePickerCustom from "../../../../components/custom/input/date";
import {getUsers} from "../../../../helpers/api/users";
import {getCompany, putCompany} from "../../../../helpers/api/companies";
import {getLoadTypes} from "../../../../helpers/api/services";
import {transformInputData} from "../../../../helpers/utility";

const dateFormat = 'YYYY-MM-DD';
const {Option} = Select;

export default class CompanyEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getCompany(this.props.match.params.id), getUsers(), getLoadTypes()])
            .then((responses) => {

                if (responses[0].data.active) {
                    responses[0].data.active = true;
                } else {
                    responses[0].data.active = false;
                }
                this.setState({
                    users: responses[1].data,
                    load_types: responses[2].data,
                    name: responses[0].data.name,
                    description: responses[0].data.description,
                    company_type: responses[0].data.company_type,
                    load_type_id: responses[0].data.load_type_id,
                    sector: responses[0].data.sector,
                    legal_representative: responses[0].data.legal_representative,
                    address: responses[0].data.address,
                    phone: responses[0].data.phone,
                    user_id: responses[0].data.user_id,
                    constitution_date: responses[0].data.constitution_date,
                    active: responses[0].data.active
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

    handlePut() {
      const user_id = transformInputData(this.state.user_id);
      const load_type_id = transformInputData(this.state.load_type_id);
      const active = transformInputData(this.state.active);

      const formData = new FormData();
      formData.append('company[name]', this.state.name);
      formData.append('company[description]', this.state.description);
      formData.append('company[company_type]', this.state.company_type);
      formData.append('company[load_type_id]', load_type_id);
      formData.append('company[sector]', this.state.sector);
      formData.append('company[legal_representative]', this.state.legal_representative);
      formData.append('company[address]', this.state.address);
      formData.append('company[phone]', this.state.phone);
      formData.append('company[user_id]', user_id);
      formData.append('company[constitution_date]', this.state.constitution_date);
      formData.append('company[active]', active);
      
      if (this.state.image != null) {
        formData.append('company[image]', this.state.image, this.state.image.name);
      }
      
      putCompany(this.props.match.params.id, formData, true).then(() => {
          this.setState({redirect: true})
      })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/companies'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="companies.title"/>

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
                                                                 onChange={(e) => this.handleChange(e.target.value, 'name')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Descripción">
                                                <TextInputCustom value={this.state.description}
                                                                 placeholder="descripción"
                                                                 label_id={'admin.title.description'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'description')}
                                                                 required/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Tipo de compañia">

                                                <TextInputCustom value={this.state.company_type}
                                                                 placeholder="tipo de compañia"
                                                                 label_id={'admin.title.company'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'company_type')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Sector">

                                                <TextInputCustom value={this.state.sector} placeholder="sector"
                                                                 label_id={'admin.title.sector'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'sector')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Representante legal">
                                                <TextInputCustom value={this.state.legal_representative}
                                                                 placeholder="representante legal"
                                                                 label_id={'admin.title.representative'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'legal_representative')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Usuarios">
                                                <SelectInputCustom value={this.state.user_id} placeholder="usuarios"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'user_id')
                                                }}
                                                                   options={this.state && this.state.users &&

                                                                   this.state.users.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.email}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.user'}>
                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Teléfono">
                                                <TextInputCustom value={this.state.phone} placeholder="teléfono"
                                                                 label_id={'admin.title.phone'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'phone')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Fecha de constitución">
                                                {
                                                    this.state && this.state.constitution_date &&
                                                    <DatePickerCustom
                                                        defaultValue={moment(this.state.constitution_date, dateFormat)}
                                                        format={dateFormat}
                                                        label_id={'label.date'}
                                                        onChange={(e) => this.handleChange(e, 'constitution_date')}/>
                                                }

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Tipo de carga">
                                                <SelectInputCustom value={this.state.load_type_id}
                                                                   placeholder="tipo de carga"
                                                                   style={{width: '100%'}} onChange={(e) => {
                                                    this.handleChange(e, 'load_type_id')
                                                }}
                                                                   options={this.state && this.state.load_types &&

                                                                   this.state.load_types.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.type'}>

                                                </SelectInputCustom>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Dirección">
                                                <TextInputCustom value={this.state.address} placeholder="dirección"
                                                                 label_id={'admin.title.address'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'address')}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Estado">
                                                <SelectInputCustom required value={this.state.active}
                                                                   placeholder="estado"
                                                                   style={{width: 120}} onChange={(e) => {
                                                    this.handleChange(e, 'active')
                                                }}
                                                                   label_id={'admin.title.active'}
                                                                   options={importantVariables.activeOptions.map((item) => {
                                                                       return <Option
                                                                           value={item.key}>{item.label}</Option>
                                                                   })}>
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
                                                <PrimaryButton htmlType={"submit"} message_id={"general.edit"}
                                                               style={{width: '200px'}}
                                                               onClick={() => this.handlePut()}/>
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
