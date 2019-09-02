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
import {getUsers} from '../../../helpers/api/adminCalls.js';
import {getRoles, getUserRoles} from "../../../helpers/api/adminCalls";

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
            if(key2 === null){
                dataTransformed[item.id] = item[key];
                return item;
            }else{
                dataTransformed[item[key2]] = item[key];
                return item;
            }

        });

        return dataTransformed
    }

    componentWillMount() {

        axios.all([getUsers(), getUserRoles(), getRoles()])
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
                        item.role = data_roles[data_user_roles[item.id]];
                        return item;
                    });
                    console.log(responses[0].data);
                    this.setState({
                        users: responses[0].data
                    });
                }
            })
    }


    redirectAdd() {
        this.props.history.push('/admin/users/add')
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {reload} = this.state;

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
                                        <IntlMessages id="users.title"/>

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
                                {this.state && this.state.users &&
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
