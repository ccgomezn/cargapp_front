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
import {Redirect} from 'react-router-dom'
import {getUserPaymentMethods, getUsers} from '../../../helpers/api/adminCalls.js';

export default class UserPaymentMethod extends Component {


    constructor(props) {
        super();
        this.state = {
            reload: false
        }

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
        axios.all([getUserPaymentMethods(), getUsers()])
            .then((responses) => {
                let user_data = this.transformDataToMap(responses[1].data, 'email');
                responses[0].data.map((item) => {
                    if (item.active) {
                        item.active = 'Activo';
                        item.color = '#00BFBF';
                    } else {
                        item.active = 'Desactivado';
                        item.color = '#ff2557';
                    }
                    item.user = user_data[item.user_id];
                    return item;
                });
                this.setState({
                    user_payment_methods: responses[0].data
                });

            })
    }


    redirectAdd() {
        this.props.history.push('/admin/user_payment_methods/add')
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {reload} = this.state;

        if (reload) {
            return <Redirect to='/admin/user_payment_methods'/>
        }
        return (
            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row gutter={12}>
                            <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="user_payment_methods.title"/>

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
                                {this.state && this.state.user_payment_methods &&
                                <SortView tableInfo={tableinfos[1]} dataList={this.state.user_payment_methods}/>
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
