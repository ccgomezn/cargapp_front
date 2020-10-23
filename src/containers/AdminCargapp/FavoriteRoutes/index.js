import React, {Component} from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import {tableinfos} from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import {Row, Col, Tabs} from 'antd';
import basicStyle from '../../../settings/basicStyle';
import axios from "axios";
import {getFavoriteRoutes, getFavoriteRoutesOfUser, getUsers} from "../../../helpers/api/users";
import {getCities} from "../../../helpers/api/locations";
import SecondaryButton from "../../../components/custom/button/secondary";
const {TabPane} = Tabs;

export default class FavoriteRoute extends Component {


    transformDataToMap(data, key) {
        var dataTransformed = {};
        data.map((item) => {
            dataTransformed[item.id] = item[key];
            return item;
        });

        return dataTransformed
    }

    componentWillMount() {
        let id = this.props.match.params.id;
        var getFavoriteFunction = function () {
            return getFavoriteRoutes();
        };
        if (id !== null && id !== undefined) {
            getFavoriteFunction = function () {
                return getFavoriteRoutesOfUser({
                    user: {
                        id: id
                    }
                });
            }
        }
        axios.all([getFavoriteFunction(), getUsers(), getCities()])
            .then((responses) => {
                if (responses[0] !== undefined) {
                    var dataUser = this.transformDataToMap(responses[1].data, 'email');
                    var dataCity = this.transformDataToMap(responses[2].data, 'name');
                    let active = [], inactive = [];
                    responses[0].data.map((item) => {

                        item.user = dataUser[item.user_id];
                        item.origin_city = dataCity[item.origin_city_id];
                        item.destination_city = dataCity[item.destination_city_id];
                        if (item.active) {
                            item.active = 'Activo';
                            item.color = '#00BFBF';
                            active.push(item);
                        } else {
                            item.active = 'Desactivado';
                            item.color = '#ff2557';
                            inactive.push(item);
                        }
                        return item;
                    });
                    this.setState({
                        favorite_routes: responses[0].data
                    });
                }


            })
    }


    redirectAdd() {
        this.props.history.push('/admin/favorite_routes/add')

    }

    render() {
        const {rowStyle, colStyle} = basicStyle;

        return (
            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="favoriteRoutes.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>
                            <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                                <SecondaryButton
                                    message_id={"general.add"}
                                    style={{width: '100%'}}
                                    onClick={() => this.redirectAdd()}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Activo" key="1">
                                        {this.state && this.state.favorite_routes &&
                                        <SortView tableInfo={tableinfos[1]} dataList={this.state.favorite_routes}/>
                                        }
                                    </TabPane>
                                    <TabPane tab="Inactivo" key="2">
                                        {this.state && this.state.inactive &&
                                        <SortView tableInfo={tableinfos[1]} dataList={this.state.inactive}/>
                                        }
                                    </TabPane>

                                </Tabs>

                            </Col>
                        </Row>

                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}
export {tableinfos};
