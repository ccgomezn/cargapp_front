import React, {Component} from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import {tableinfos} from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../settings/basicStyle';
import PrimaryButton from "../../../components/custom/button/primary";
import axios from "axios";
import {getFavoriteRoutes, getUsers, getCities} from '../../../helpers/api/adminCalls.js';

export default class FavoriteRoute extends Component {


    constructor(props) {
        super(props);
    }


    transformDataToMap(data, key) {
        var dataTransformed = {};
        data.map((item) => {
            dataTransformed[item.id] = item[key];
            return item;
        });

        return dataTransformed
    }

    componentWillMount() {
        axios.all([getFavoriteRoutes(), getUsers(), getCities()])
            .then((responses) => {
                var dataUser = this.transformDataToMap(responses[1].data, 'email');
                var dataCity = this.transformDataToMap(responses[2].data, 'name');
                responses[0].data.map((item) => {
                    if (item.active) {
                        item.active = 'Activo';
                        item.color = '#00BFBF';
                    } else {
                        item.active = 'Desactivado';
                        item.color = '#ff2557';
                    }
                    item.user = dataUser[item.user_id];
                    item.origin_city = dataCity[item.origin_city_id];
                    item.destination_city = dataCity[item.destination_city_id];
                    return item;
                });
                this.setState({
                    favorite_routes: responses[0].data
                });

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
                                <PrimaryButton
                                    message_id={"general.add"}
                                    style={{width: '100%'}}
                                    onClick={() => this.redirectAdd()}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                {this.state && this.state.favorite_routes &&
                                <SortView tableInfo={tableinfos[1]} dataList={this.state.favorite_routes}/>
                                }
                            </Col>
                        </Row>

                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}
export {tableinfos};
