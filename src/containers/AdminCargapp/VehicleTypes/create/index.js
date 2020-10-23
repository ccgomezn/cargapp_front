import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col, Avatar} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card, message} from 'antd';
import {Redirect} from 'react-router-dom'
import TextInputCustom from "../../../../components/custom/input/text";
import AreaInputCustom from "../../../../components/custom/input/area";
import {postVehicleType} from "../../../../helpers/api/vehicles";


export default class VehicleTypeCreate extends Component {


    constructor() {
        super();
        this.state = {
            code: '',
            name: '',
            description: '',
            redirect: false
        }
    }

    handleChange(e, type) {

        this.setState(
            {
                [type]: e.target.value
            }
        )
    }

    handlePost() {
        postVehicleType(
            {
                vehicle_type: {
                    name: this.state.name,
                    code: this.state.code,
                    description: this.state.description,
                    icon: this.state.icon,
                    active: true,
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
            return <Redirect to='/admin/vehicle_types'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="vehicleType.title"/>

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
                                                <TextInputCustom label_id={'admin.title.name'} required
                                                                 value={this.state.name} placeholder="nombre"
                                                                 onChange={(e) => this.handleChange(e, 'name')}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Codigo">
                                                <TextInputCustom label_id={'admin.title.code'} required
                                                                 value={this.state.code} placeholder="código"
                                                                 onChange={(e) => this.handleChange(e, 'code')}/>
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
                                                        <TextInputCustom label_id={'admin.title.icon'} required
                                                                         value={this.state.icon} placeholder="ícono"
                                                                         onChange={(e) => this.handleChange(e, 'icon')}/>
                                                    </Col>

                                                </Row>

                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Descripción">
                                                <AreaInputCustom label_id={'admin.title.description'} required
                                                                 value={this.state.description}
                                                                 placeholder="descripción"
                                                                 onChange={(e) => this.handleChange(e, 'description')}/>
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
