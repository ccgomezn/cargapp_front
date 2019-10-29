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
import {getPermissions, getRoles, getUsers} from "../../../helpers/api/users";
import {getModels} from "../../../helpers/api/internals";

export default class Permission extends Component {


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
        axios.all([getPermissions(),
            getUsers(),
            getModels(),
            getRoles()])
            .then((responses) => {
                if (responses[0] !== undefined) {
                    var dataUser = this.transformDataToMap(responses[1].data, 'email');
                    var dataCargappModels = this.transformDataToMap(responses[2].data, 'name');
                    var dataRoles = this.transformDataToMap(responses[3].data, 'name');
                    responses[0].data.map((item) => {
                        if (item.active) {
                            item.active = 'Activo';
                            item.color = '#00BFBF';
                        } else {
                            item.active = 'Desactivado';
                            item.color = '#ff2557';
                        }
                        item.user = dataUser[item.user_id]
                        item.model = dataCargappModels[item.cargapp_model_id]
                        item.role = dataRoles[item.role_id]

                        return item;
                    });
                    this.setState({
                        parameters: responses[0].data
                    });
                }


            })
    }


    redirectAdd() {
        this.props.history.push('/admin/permissions/add')
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
                                        <IntlMessages id="permissions.title"/>

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
                                {this.state && this.state.parameters &&
                                <SortView tableInfo={tableinfos[1]} dataList={this.state.parameters}/>
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
