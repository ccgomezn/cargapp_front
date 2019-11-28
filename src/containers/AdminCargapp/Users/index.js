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
import {getActiveUserRoles, getDriversFromCompany, getRoles, getUsers} from "../../../helpers/api/users";
import {getMineCompanies} from "../../../helpers/api/companies";
export default class User extends Component {


    constructor(props) {
        super();
        this.state = {
            reload: false
        }

    }

    transformDataToMap(data, key, key2 = null) {
        var dataTransformed = {};
        data.map((item) => {
            if (key2 === null) {
                dataTransformed[item.id] = item[key];
                return item;
            } else {
                if (dataTransformed[item[key2]]) {
                    dataTransformed[item[key2]].push(item[key]);

                } else {
                    dataTransformed[item[key2]] = [item[key]];

                }

                return item;
            }

        });

        return dataTransformed
    }

    componentWillMount() {

        let getUsersFunction = function () {
            return getUsers();
        };

        if (this.props.driver) {
            getUsersFunction = function (company_id) {
                return getDriversFromCompany(company_id);
            };
        }
        getMineCompanies().then((response) => {
            let company_id = '';
            if(response.data[0]){
                company_id = response.data[0].id
            }
            axios.all([getUsersFunction(company_id), getActiveUserRoles(), getRoles()])
                .then((responses) => {
                    if (responses[0] !== undefined) {
                        let data_roles = this.transformDataToMap(responses[2].data, 'name');
                        let data_user_roles = this.transformDataToMap(responses[1].data, 'role_id', 'user_id');
                        responses[0].data.map((item) => {
                            if (item.active) {
                                item.active = 'Activo';
                                item.color = '#00BFBF';
                            } else {
                                item.active = 'Desactivado';
                                item.color = '#ff2557';
                            }
                            if (data_user_roles[item.id]) {
                                data_user_roles[item.id].map((role) => {

                                    if (item.role !== '' && item.role !== undefined) {
                                        item.role += ', ' + data_roles[role];
                                    } else {
                                        item.role = data_roles[role];
                                    }
                                    return role;
                                });
                            }

                            return item;
                        });
                        this.setState({
                            users: responses[0].data
                        });
                    }
                })
        })

    }


    redirectAdd(driver) {
        if (driver) {
            this.props.history.push('/vehicle_manager/drivers/add')

        } else {
            this.props.history.push('/admin/users/add')

        }
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {reload} = this.state;
        const {driver} = this.props;
        if (reload) {
            return <Redirect to='/admin/users'/>
        }
        return (
            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row gutter={12}>
                            <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        {driver ? <IntlMessages id="drivers.title"/> : <IntlMessages id="users.title"/>}

                                    </h1>
                                </PageHeader>
                            </Col>

                            <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                                <PrimaryButton
                                    message_id={"general.add"}
                                    style={{width: '100%'}}
                                    onClick={() => this.redirectAdd(driver)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                {this.state && this.state.users && driver &&

                                <SortView tableInfo={tableinfos[2]} dataList={this.state.users}/>
                                }
                                {this.state && this.state.users && !driver &&

                                <SortView tableInfo={tableinfos[1]} dataList={this.state.users}/>
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
