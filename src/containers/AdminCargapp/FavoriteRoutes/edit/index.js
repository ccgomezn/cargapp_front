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
import {putFavoriteRoute, getFavoriteRoute, getUsers, getCities} from '../../../../helpers/api/adminCalls.js';
import SelectInputCustom from "../../../../components/custom/input/select";
import importantVariables from "../../../../helpers/hashVariables";

const {Option} = Select;
export default class FavoriteRouteEdit extends Component {


    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }


    componentWillMount() {
        console.log(this.props);
        axios.all([getFavoriteRoute(this.props.match.params.id), getUsers(), getCities()])
            .then((responses) => {


                this.setState({
                    users: responses[1].data,
                    cities: responses[2].data,
                    user_id: responses[0].data.user_id,
                    origin_city_id: responses[0].data.origin_city_id,
                    destination_city_id: responses[0].data.destination_city_id,
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
        const user_id = this.state.user_id !== undefined && this.state.user_id.key !== undefined ? this.state.user_id.key : this.state.user_id;
        const destination_city_id = this.state.destination_city_id !== undefined && this.state.destination_city_id.key !== undefined ? this.state.destination_city_id.key : this.state.destination_city_id;
        const origin_city_id = this.state.origin_city_id !== undefined && this.state.origin_city_id.key !== undefined ? this.state.origin_city_id.key : this.state.origin_city_id;
        const active = this.state.active !== undefined && this.state.active.key !== undefined ? this.state.active.key : this.state.active;
        putFavoriteRoute(this.props.match.params.id,
            {
                favorite_route: {
                    user_id: user_id,
                    origin_city_id: origin_city_id,
                    destination_city_id: destination_city_id,
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
            return <Redirect to='/admin/favorite_routes'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="favoriteRoutes.title"/>

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

                                </Row>
                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Ciudad de origen">
                                            <SelectInputCustom value={this.state.origin_city_id}
                                                               placeholder="Ciudad de origen"
                                                               style={{width: '100%'}}
                                                               onChange={(e) => {
                                                                   this.handleChange(e, 'origin_city_id')
                                                               }}
                                                               options={this.state && this.state.cities &&
                                                               this.state.cities.map((item) => {
                                                                   return <Option value={item.id}>{item.name}</Option>
                                                               })
                                                               }
                                                               label_id={'admin.title.city'}>

                                            </SelectInputCustom>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Ciudad de destino">
                                            <SelectInputCustom value={this.state.destination_city_id}
                                                               placeholder="Ciudad de destino"
                                                               style={{width: '100%'}}
                                                               onChange={(e) => {
                                                                   this.handleChange(e, 'destination_city_id')
                                                               }}
                                                               options={this.state && this.state.cities &&
                                                               this.state.cities.map((item) => {
                                                                   return <Option value={item.id}>{item.name}</Option>
                                                               })
                                                               }
                                                               label_id={'admin.title.city'}>

                                            </SelectInputCustom>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Estado">
                                            <SelectInputCustom value={this.state.active} placeholder="estado"
                                                               style={{width: 240}}
                                                               onChange={(e) => {
                                                                   this.handleChange(e, 'active')
                                                               }}
                                                               options={importantVariables.activeOptions.map((item) => {
                                                                   return <Option
                                                                       value={item.key}>{item.label}</Option>;
                                                               })}
                                                               label_id={'admin.title.active'}>
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
