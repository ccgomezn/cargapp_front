import React, {Component} from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import {tableinfos} from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import {Row, Col, Tabs} from 'antd';
import basicStyle from '../../../settings/basicStyle';
import axios from "axios";
import {getUserCoupons, getUsers} from "../../../helpers/api/users";
import {getCoupons, getModels} from "../../../helpers/api/internals";
import SecondaryButton from "../../../components/custom/button/secondary";
const {TabPane} = Tabs;

export default class UserCoupon extends Component {


    constructor(props) {
        super();


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
        axios.all([getUserCoupons(), getUsers(), getCoupons(), getModels()])
            .then((responses) => {
                if (responses[0] !== undefined) {
                    var data_user = this.transformDataToMap(responses[1].data, 'email');
                    var data_coupons = this.transformDataToMap(responses[2].data, 'name');
                    var data_models = this.transformDataToMap(responses[3].data, 'name');
                    let active = [], inactive = [];
                    responses[0].data.map((item) => {

                        item.user = data_user[item.user_id]
                        item.coupon = data_coupons[item.coupon_id]
                        item.cargapp_model = data_models[item.cargapp_model_id]
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
                        coupons: active,
                        inactive
                    });
                }


            })
    }


    redirectAdd() {
        this.props.history.push('/admin/user_coupons/add')

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
                                        <IntlMessages id="user_coupons.title"/>

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
                                        {this.state && this.state.coupons &&
                                        <SortView tableInfo={tableinfos[1]} dataList={this.state.coupons}/>
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
