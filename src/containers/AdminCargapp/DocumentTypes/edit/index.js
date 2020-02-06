import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form, Select} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card, message} from 'antd';
import {Redirect} from 'react-router-dom'
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";
import AreaInputCustom from "../../../../components/custom/input/area";
import {getDocumentType, putDocumentType, findParameters} from "../../../../helpers/api/internals";
import {transformInputData} from "../../../../helpers/utility";
import axios from 'axios';

const {Option} = Select;
export default class DocumentTypeEdit extends Component {


    constructor(props) {
        super();
        this.state = {
            code: '',
            name: '',
            description: '',
            active: false,
            redirect: false
        }
    }

    componentWillMount() {
      axios.all([getDocumentType(this.props.match.params.id), findParameters('DOCUMENT_CATEGORY')])
        .then((responses) => {     
          this.setState({
              document_categories: responses[1].data.parameters,
              code: responses[0].data.code,
              name: responses[0].data.name,
              description: responses[0].data.description,
              active: responses[0].data.active,
              category: responses[0].data.category,
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

        putDocumentType(this.props.match.params.id,
            {
                document_type: {
                    name: this.state.name,
                    code: this.state.code,
                    description: this.state.description,
                    active: transformInputData(this.state.active),
                    category: transformInputData(this.state.category),
                }

            }).then(() => {
            this.setState({redirect: true})
        }).catch(error => {
            let errorObject = JSON.parse(JSON.stringify(error));

            message.warning(errorObject.message);
        });
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/document_types'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="documentType.title"/>

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
                                                <TextInputCustom required value={this.state.name} placeholder="nombre"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'name')}
                                                                 label_id={'admin.title.name'}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Codigo">
                                                <TextInputCustom required value={this.state.code} placeholder="código"
                                                                 label_id={'admin.title.code'}
                                                                 onChange={(e) => this.handleChange(e.target.value, 'code')}/>
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
                                                                options={this.state && this.state.document_categories &&
                                                                this.state.document_categories.map((item) => {
                                                                    return <Option
                                                                        value={item.code}>{item.name}</Option>
                                                                })
                                                                }
                                                                label_id={'admin.title.category'}>
                                            </SelectInputCustom>
                                        </Form.Item>
                                      </Col>
                                      <Col span={12}>
                                          <Form.Item label="Descripción">
                                              <AreaInputCustom required value={this.state.description}
                                                                placeholder="descripción"
                                                                label_id={'admin.title.description'}
                                                                onChange={(e) => this.handleChange(e.target.value, 'description')}/>
                                          </Form.Item>
                                      </Col>

                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Estado">
                                                <SelectInputCustom required value={this.state.active}
                                                                   placeholder="estado" style={{width: 120}}
                                                                   onChange={(e) => {
                                                                       this.handleChange(e, 'active')
                                                                   }}
                                                                   options={importantVariables.activeOptions.map((item) => {
                                                                       return <Option
                                                                           value={item.key}>{item.label}</Option>
                                                                   })}
                                                                   label_id={'admin.title.active'}>
                                                </SelectInputCustom>
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
