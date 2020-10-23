import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form, Select} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import {transformInputData} from "../../../../helpers/utility";
import AreaInputCustom from "../../../../components/custom/input/area";
import {getActiveCountries, postState} from "../../../../helpers/api/locations";
const {Option} = Select;

export default class StateCreate extends Component {


    constructor() {
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


    componentWillMount() {
        axios.all([getActiveCountries()])
            .then((responses) => {


                this.setState({
                    countries: responses[0].data
                });

            })
    }


    handlePost() {
        const country_id = transformInputData(this.state.country_id)
        postState(
            {
                state: {
                    name: this.state.name,
                    code: this.state.code,
                    description: this.state.description,
                    country_id: country_id,
                    active: true,
                }

            }).then(() => {
            this.setState({redirect: true})
        })
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/admin/states'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="states.title"/>

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
                                                                 onChange={(e) => this.handleChange(e.target.value, 'name')}
                                                                 label_id={'admin.title.name'}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Código">
                                                <TextInputCustom value={this.state.code} placeholder="código"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'code')}
                                                                 label_id={'admin.title.code'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Descripción">
                                                <AreaInputCustom value={this.state.description}
                                                                 placeholder="descripción"
                                                                 onChange={(e) => this.handleChange(e.target.value, 'description')}
                                                                 label_id={'admin.title.description'}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="País">
                                                <SelectInputCustom required value={this.state.country_id}
                                                                   placeholder="país"
                                                                   style={{width: 240}} onChange={(e) => {
                                                    this.handleChange(e, 'country_id')
                                                }}
                                                                   options={this.state && this.state.countries &&
                                                                   this.state.countries.map((item) => {
                                                                       return <Option
                                                                           value={item.id}>{item.name}</Option>
                                                                   })
                                                                   }
                                                                   label_id={'admin.title.country'}>

                                                </SelectInputCustom>
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
