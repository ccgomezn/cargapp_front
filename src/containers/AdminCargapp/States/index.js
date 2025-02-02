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
import {getCountries, getStates} from "../../../helpers/api/locations";
import SecondaryButton from "../../../components/custom/button/secondary";
const {TabPane} = Tabs;

export default class State extends Component {


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
        axios.all([getStates(), getCountries()])
            .then((responses) => {
                if (responses[0] !== undefined) {
                    let data_countries = this.transformDataToMap(responses[1].data, 'name')
                    let data_countries_active = this.transformDataToMap(responses[1].data, 'active')
                    responses[0].data.map((item) => {
                        if (item.active && data_countries_active[item.country_id]) {
                            item.active = 'Activo';
                            item.color = '#00BFBF';
                        } else {
                            item.active = 'Desactivado';
                            item.color = '#ff2557';
                        }
                        item.country = data_countries[item.country_id]
                        return item;

                    });
                    let active = [];
                    let inactive = [];
                    responses[0].data.forEach(item => {
                        if(item.active === 'Activo') active.push(item);
                        else inactive.push(item);
                    });
                    this.setState({
                        states: active,
                        inactive
                    });
                }


            })
    }


    redirectAdd() {
        this.props.history.push('/admin/states/add')
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {reload} = this.state;

        if (reload) {
            return <Redirect to='/admin/states'/>
        }
        return (
            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row gutter={12}>
                            <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="states.title"/>

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
                                        {this.state && this.state.states &&
                                        <SortView tableInfo={tableinfos[1]} dataList={this.state.states}/>
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
