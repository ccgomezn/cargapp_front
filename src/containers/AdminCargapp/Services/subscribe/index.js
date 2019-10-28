import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

import {
    getActiveProfiles,
    getDriversFromCompany,
    getMineCompanies,
    putService
} from "../../../../helpers/api/adminCalls";

import importantVariables from "../../../../helpers/hashVariables";
import SortView from "../../../../components/custom/table/sortView";
import {tableinfos} from "./configs";


export default class ServiceDetail extends Component {


    constructor(props) {
        super();
        this.state = {
            redirect: false
        }
    }

    transformDataToMap(data, key, key1 = null) {
        var dataTransformed = {};
        data.map((item) => {
            if (key1 === null) {
                if (key) {
                    dataTransformed[item.id] = item[key];

                } else {
                    dataTransformed[item.id] = item;

                }
            } else {
                if (key) {
                    dataTransformed[key1] = item[key];

                } else {
                    dataTransformed[key1] = item;

                }
            }
            return item;
        });

        return dataTransformed
    }

    componentWillMount() {
        getMineCompanies().then((response) => {
            let company_id = '';

            if(response.data[0]){
                company_id = response.data[0].id;
            }

            axios.all([getDriversFromCompany(company_id), getActiveProfiles()])
                .then((responses) => {
                    let profiles = this.transformDataToMap(responses[1].data);

                    responses[0].data.forEach((user) => {
                        if (profiles[user.id]) {
                            user.first_name = profiles[user.id].firt_name;
                            user.last_name = profiles[user.id].last_name;
                        } else {
                            user.first_name = '';
                            user.last_name = '';
                        }
                        user.service_id = this.props.match.params.id;
                    });
                    this.setState({
                        users: responses[0].data
                    });
                })
        })

    }

    handleChange(value, type) {

        this.setState(
            {
                [type]: value
            }
        );
    }

    goBack() {
        if (this.props.generator) {
            this.props.history.push('/generator/services')
        } else {
            this.props.history.push('/admin/services')
        }
    }


    changeStatus() {
        let newCode = importantVariables.status_road_service_map[this.state.status_code[this.state.statu_id]].next;
        let newId = this.state.status_from_code[newCode];
        putService(this.props.match.params.id, {statu_id: newId}).then(() => window.location.reload());
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/admin/services'/>
        }
        return (

            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id={"serviceBook.title"}/>
                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                {this.state && this.state.users &&

                                <SortView tableInfo={tableinfos[0]} dataList={this.state.users}/>
                                }
                            </Col>
                        </Row>

                    </Col>
                </Row>


            </LayoutWrapper>
        );
    }
}
