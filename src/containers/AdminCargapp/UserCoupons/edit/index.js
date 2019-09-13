import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card, message} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Select} from 'antd';
import {putUserCoupon, getUsers, getUserCoupon, getCoupons, getModels} from '../../../../helpers/api/adminCalls.js';
import SelectInputCustom from "../../../../components/custom/input/select";
import TextInputCustom from "../../../../components/custom/input/text";
import importantVariables from "../../../../helpers/hashVariables";
import {transformInputData} from "../../../../helpers/utility";

const {Option} = Select;
export default class UserCouponEdit extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        axios.all([getUserCoupon(this.props.match.params.id), getUsers(), getCoupons(), getModels()])
            .then((responses) => {


                this.setState({
                    users: responses[1].data,
                    coupons: responses[2].data,
                    user_id: responses[0].data.user_id,
                    coupon_id: responses[0].data.coupon_id,
                    cargapp_model_id: responses[0].data.cargapp_model_id,
                    applied_item_id: responses[0].data.applied_item_id,
                    discount: responses[0].data.discount,
                    active: responses[0].data.active,
                });
            }).catch(error => {
            let errorObject = JSON.parse(JSON.stringify(error));

            message.warning(errorObject.message);
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
        putUserCoupon(this.props.match.params.id,
            {
                user_coupon: {
                    user_id: transformInputData(this.state.user_id),
                    coupon_id: transformInputData(this.state.coupon_id),
                    cargapp_model_id: transformInputData(this.state.cargapp_model_id),
                    applied_item_id: transformInputData(this.state.applied_item_id),
                    discount: this.state.discount,
                    active: transformInputData(this.state.active),
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
            return <Redirect to='/admin/user_coupons'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="user_coupons.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="cardContent" style={{marginTop: '50px'}}>
                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Usuario">
                                            <SelectInputCustom value={this.state.user_id} placeholder="usuario"
                                                               style={{width: '100%'}} onChange={(e) => {
                                                this.handleChange(e, 'user_id')
                                            }}
                                                               options={this.state && this.state.users &&

                                                               this.state.users.map((item) => {
                                                                   return <Option value={item.id}>{item.email}</Option>
                                                               })
                                                               }
                                                               label_id={'admin.title.user'}>

                                            </SelectInputCustom>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Cupon">
                                            <SelectInputCustom value={this.state.coupon_id} placeholder="cupon"
                                                               style={{width: '100%'}} onChange={(e) => {
                                                this.handleChange(e, 'coupon_id')
                                            }}
                                                               options={this.state && this.state.coupons &&
                                                               this.state.coupons.map((item) => {
                                                                   return <Option value={item.id}>{item.name}</Option>
                                                               })
                                                               }
                                                               label_id={'admin.title.coupon'}>

                                            </SelectInputCustom>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Modelo cargapp">
                                            <SelectInputCustom value={this.state.cargapp_model_id}
                                                               placeholder="modelo cargapp"
                                                               style={{width: '100%'}} onChange={(e) => {
                                                this.handleChange(e, 'cargapp_model_id')
                                            }}
                                                               options={this.state && this.state.cargapp_models &&
                                                               this.state.cargapp_models.map((item) => {
                                                                   return <Option value={item.id}>{item.name}</Option>
                                                               })
                                                               }
                                                               label_id={'admin.title.model'}>

                                            </SelectInputCustom>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Descuento">
                                            <TextInputCustom type="number" value={this.state.discount}
                                                             placeholder="descuento"
                                                             onChange={(e) => this.handleChange(e.target.value, 'discount')}
                                                             label_id={'admin.title.discount'}/>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Id de item">
                                            <TextInputCustom type="number" value={this.state.applied_item_id}
                                                             placeholder="id de item"
                                                             onChange={(e) => this.handleChange(e.target.value, 'applied_item_id')}
                                                             label_id={'admin.title.item'}/>

                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Estado">
                                            <SelectInputCustom required value={this.state.active}
                                                               placeholder="estado"
                                                               options={importantVariables.activeOptions.map((item) => {
                                                                   return <Option
                                                                       value={item.key}>{item.label}</Option>
                                                               })}
                                                               label_id={'admin.title.active'}
                                                               style={{width: 120}} onChange={(e) => {
                                                this.handleChange(e, 'active')
                                            }}>
                                            </SelectInputCustom>
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item wrapperCol={{span: 24}}>
                                            <PrimaryButton message_id={"general.edit"} style={{width: '200px'}}
                                                           onClick={() => this.handlePut()}/>
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
