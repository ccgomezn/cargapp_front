import React, {Component} from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import {tableinfos} from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import {Row, Col, Tabs} from 'antd';
import basicStyle from '../../../settings/basicStyle';
import axios from "axios";
import {getRoles, getUserRoles, getUsers} from "../../../helpers/api/users";
import SecondaryButton from "../../../components/custom/button/secondary";
const { TabPane } = Tabs;

export default class UserRole extends Component {


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
        axios.all([getUserRoles(), getUsers(), getRoles()])
            .then((responses) => {
                if (responses[0] !== undefined) {
                    var dataUser = this.transformDataToMap(responses[1].data, 'email');
                    var dataRole = this.transformDataToMap(responses[2].data, 'name');
                    responses[0].data.map((item) => {
                        if (item.active) {
                            item.active = 'Activo';
                            item.color = '#00BFBF';
                        } else {
                            item.active = 'Desactivado';
                            item.color = '#ff2557';
                        }
                        item.user = dataUser[item.user_id]
                        item.admin = dataUser[item.admin_id]
                        item.role = dataRole[item.role_id]

                        return item;
                    });
                    let active = [];
                    let unactive = [];
                    responses[0].data.forEach(item => {
                        if(item.active === 'Activo') active.push(item);
                        else unactive.push(item);
                    })
                    this.setState({
                        roles: active,
                        nonActiveRoles: unactive
                    });
                }


            })
    }


    redirectAdd() {
        this.props.history.push('/admin/user_roles/add')

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
                                        <IntlMessages id="users_roles.title"/>

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
                                {this.state && this.state.roles &&
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Activo" key="1">
                                        {this.state && this.state.roles &&
                                        <SortView tableInfo={tableinfos[1]} dataList={this.state.roles}/>
                                        }
                                    </TabPane>
                                    <TabPane tab="Inactivo" key="2">
                                        {this.state && this.state.nonActiveRoles &&
                                        <SortView tableInfo={tableinfos[1]} dataList={this.state.nonActiveRoles}/>
                                        }
                                    </TabPane>

                                </Tabs>
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
