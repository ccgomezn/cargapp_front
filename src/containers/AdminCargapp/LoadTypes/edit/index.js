import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form, Avatar} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card, message} from 'antd';
import {Redirect} from 'react-router-dom'
import {Select} from 'antd';
import TextInputCustom from "../../../../components/custom/input/text";
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";
import AreaInputCustom from "../../../../components/custom/input/area";
import {getLoadType, putLoadType} from "../../../../helpers/api/services";

const {Option} = Select;
export default class LoadTypeEdit extends Component {


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
        getLoadType(this.props.match.params.id)
            .then((response) => {


                this.setState({
                    code: response.data.code,
                    name: response.data.name,
                    description: response.data.description,
                    active: response.data.active,
                    icon: response.data.icon,
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

        putLoadType(this.props.match.params.id,
            {
                load_type: {
                    name: this.state.name,
                    code: this.state.code,
                    description: this.state.description,
                    icon: this.state.icon,
                    active: active,
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
            return <Redirect to='/admin/load_types'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="loadType.title"/>

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
                                                                 onChange={(e) => this.handleChange(e, 'name')}
                                                                 label_id={'admin.title.name'}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Codigo">
                                                <TextInputCustom required value={this.state.code} placeholder="código"
                                                                 onChange={(e) => this.handleChange(e, 'code')}
                                                                 label_id={'admin.title.code'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={12}>
                                            <Form.Item label="Ícono">
                                                <Row>
                                                    <Col span={2}>
                                                        <Avatar src={this.state.icon}/>
                                                    </Col>
                                                    <Col span={22}>
                                                        <TextInputCustom required value={this.state.icon}
                                                                         placeholder="ícono"
                                                                         label_id={'admin.title.icon'}
                                                                         onChange={(e) => this.handleChange(e, 'icon')}/>
                                                    </Col>

                                                </Row>

                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Descripción">
                                                <AreaInputCustom required value={this.state.description}
                                                                 placeholder="descripción"
                                                                 label_id={'admin.title.description'}
                                                                 onChange={(e) => this.handleChange(e, 'description')}/>
                                            </Form.Item>
                                        </Col>

                                    </Row>
                                    <Row gutter={10}>
                                        <Col span={24}>
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
                                                    <Option value={true}>Activo</Option>
                                                    <Option value={false}>Desactivado</Option>

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
