import React, {Component} from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import {tableinfos} from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import {Row, Col, Tabs} from 'antd';
import basicStyle from '../../../settings/basicStyle';
import axios from "axios";
import {Redirect} from 'react-router-dom'
import {getDocumentsOfUser} from "../../../helpers/api/users";
import {getDocuments} from "../../../helpers/api/internals";
import SecondaryButton from "../../../components/custom/button/secondary";
const {TabPane} = Tabs;

export default class Document extends Component {


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
        let id = this.props.match.params.id;
        var getDocumentsFunction = function () {
            return getDocuments();
        };
        if (id !== null && id !== undefined) {
            getDocumentsFunction = function () {
                return getDocumentsOfUser({
                    user: {
                        id: id
                    }
                });
            }
        }
        axios.all([getDocumentsFunction()])
            .then((responses) => {
                if (responses[0] !== undefined) {
                    let active = [], inactive = [];
                    responses[0].data.map((item) => {
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
                        documents: active, inactive
                    });
                }


            })
    }


    redirectAdd() {
        this.props.history.push('/admin/documents/add')
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {reload} = this.state;

        if (reload) {
            return <Redirect to='/admin/documents'/>
        }
        return (
            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row gutter={12}>
                            <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="documents.title"/>

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
                                        {this.state && this.state.documents &&
                                        <SortView tableInfo={tableinfos[1]} dataList={this.state.documents}/>
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
