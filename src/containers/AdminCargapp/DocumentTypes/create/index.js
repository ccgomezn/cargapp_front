import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form, Select} from "antd";
import axios from 'axios';
import SelectInputCustom from "../../../../components/custom/input/select";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card, message} from 'antd';
import {Redirect} from 'react-router-dom'
import TextInputCustom from "../../../../components/custom/input/text";
import AreaInputCustom from "../../../../components/custom/input/area";
import {postDocumentType, findParameters} from "../../../../helpers/api/internals";
import {transformInputData} from "../../../../helpers/utility";

const {Option} = Select;

export default class DocumentTypeCreate extends Component {


    constructor(props) {
        super();
        this.state = {
            code: '',
            name: '',
            description: '',
            redirect: false
        }
    }

    componentWillMount() {
      axios.all([findParameters('DOCUMENT_CATEGORY')])
        .then((responses) => {     
          this.setState({
              document_categories: responses[0].data.parameters,
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
        postDocumentType(
            {
                document_type: {
                    name: this.state.name,
                    code: this.state.code,
                    description: this.state.description,
                    active: true,
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
