import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import {Form, Select} from "antd";
import PrimaryButton from "../../../../components/custom/button/primary"
import {Card, message} from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {postFavoriteRoute, getUsers, getCities} from '../../../../helpers/api/adminCalls.js';

const {Option} = Select;

export default class FavoriteRouteCreate extends Component {


    constructor(props) {
        super();
        this.state = {
            user_id: '',
            origin_city_id: '',
            destination_city_id: '',
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

    handlePost() {
        postFavoriteRoute(
            {
                favorite_route: {
                    user_id: this.state.user_id,
                    destination_city_id: this.state.destination_city_id,
                    origin_city_id: this.state.origin_city_id,
                    active: true,
                }

            }).then(() => {
            this.setState({redirect: true})
        }).catch(error => {
            let errorObject = JSON.parse(JSON.stringify(error));

            message.warning(errorObject.message);
        });
    }


    componentWillMount() {
        axios.all([getUsers(), getCities()])
            .then((responses) => {

                this.setState({
                    users: responses[0].data,
                    cities: responses[1].data,
                });

            })

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
                                            <Select value={this.state.user_id} placeholder="usuario"
                                                    style={{width: '100%'}} onChange={(e) => {
                                                this.handleChange(e, 'user_id')
                                            }}>
                                                {this.state && this.state.users &&

                                                this.state.users.map((item) => {
                                                    return <Option value={item.id}>{item.email}</Option>
                                                })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row gutter={10}>
                                    <Col span={12}>
                                        <Form.Item label="Ciudad de origen">
                                            <Select value={this.state.origin_city_id} placeholder="Ciudad de origen"
                                                    style={{width: '100%'}}
                                                    onChange={(e) => {
                                                        this.handleChange(e, 'origin_city_id')
                                                    }}>
                                                {this.state && this.state.cities &&
                                                this.state.cities.map((item) => {
                                                    return <Option value={item.id}>{item.name}</Option>
                                                })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Ciudad de destino">
                                            <Select value={this.state.destination_city_id} placeholder="Ciudad de destino"
                                                    style={{width: '100%'}}
                                                    onChange={(e) => {
                                                        this.handleChange(e, 'destination_city_id')
                                                    }}>
                                                {this.state && this.state.cities &&
                                                this.state.cities.map((item) => {
                                                    return <Option value={item.id}>{item.name}</Option>
                                                })
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Form.Item wrapperCol={{span: 24}}>
                                            <PrimaryButton message_id={"general.add"} style={{width: '200px'}}
                                                           onClick={() => this.handlePost()}/>
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
