import React, {Component} from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import {tableinfos} from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import {Row, Col, Tabs} from 'antd';
import basicStyle from '../../../settings/basicStyle';
import PrimaryButton from "../../../components/custom/button/primary";
import axios from "axios";
import {getUserChallenges, getUsers} from "../../../helpers/api/users";
import {getChallenges} from "../../../helpers/api/internals";
import SecondaryButton from "../../../components/custom/button/secondary";
const {TabPane} = Tabs;

export default class UserChallenge extends Component {


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
        axios.all([getUserChallenges(), getUsers(), getChallenges()])
            .then((responses) => {
                if (responses[0] !== undefined) {
                    let active = [], inactive = [];
                    var data_user = this.transformDataToMap(responses[1].data, 'email');
                    var data_challenge = this.transformDataToMap(responses[2].data, 'name');
                    responses[0].data.map((item) => {

                        item.user = data_user[item.user_id]
                        item.challenge = data_challenge[item.challenge_id]
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
                        challenges: active, inactive
                    });
                }


            })
    }


    redirectAdd() {
        this.props.history.push('/admin/user_challenges/add')

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
                                        <IntlMessages id="user_challenges.title"/>

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
                                        {this.state && this.state.challenges &&
                                        <SortView tableInfo={tableinfos[1]} dataList={this.state.challenges}/>
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
