import React, {Component} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import {tableinfos} from './configs';
import SortView from '../../../../components/custom/table/sortView';
import PageHeader from '../../../../components/utility/pageHeader';
import IntlMessages from '../../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../../settings/basicStyle';
import axios from "axios";
import {Redirect} from 'react-router-dom'
import {
    getProfiles, getRateServices,
    getUsers,
    getUsersOfService
} from "../../../../helpers/api/adminCalls";

export default class Service extends Component {


    constructor(props) {
        super(props);
        this.state = {
            reload: false
        }

    }


    transformDataToMap(data, key = null) {
        var dataTransformed = {};
        data.map((item) => {
            if (key) {
                dataTransformed[item[key]] = item;
            } else {
                dataTransformed[item.id] = item;
            }
            return item;
        });

        return dataTransformed
    }

    meanRateServices(data){
        let dataTransformed = {};
        data.map((item) => {
            if(dataTransformed[item.user_id]){
                dataTransformed[item.user_id] = {
                    sum: item.driver_point,
                    count: 1
                }
            }else{
                dataTransformed[item.user_id].sum += item.driver_point;
                dataTransformed[item.user_id].count += 1;
            }
            return item;
        });
        return dataTransformed;
    }

    componentWillMount() {
        axios.all([getUsersOfService(), getUsers(), getProfiles(), getRateServices()])
            .then((responses) => {
                let profiles = this.transformDataToMap(responses[2].data, 'user_id');
                let users = this.transformDataToMap(responses[1].data);
                let rate = this.meanRateServices(responses[3].data);
                if (responses[0] !== undefined) {
                    responses[0].data.map((item) => {
                        if (item.approved) {
                            item.color = '#00BFBF';
                        } else if(item.approved !== null){
                            item.color = '#ff2557';
                        }else{
                            item.color = '#010935';
                        }

                        let user_id = item.user_id;
                        item.user = profiles[user_id].first_name + ' ' + profiles[user_id].last_name + ' (' + users[user_id].email + ')';
                        item.document = profiles[user_id].document_id;
                        if(rate[user_id]){
                            item.score = String(parseInt(rate[user_id].sum / rate[user_id].count)) + ' Puntos';
                        }else{
                            item.score = 'No existe calificación'
                        }
                        if(item.approved !== null){
                            if(item.approved){
                                item.approved = 'Aprobado';
                            }else{
                                item.approved = 'No Aprobado';
                            }
                        }else{
                            item.approved = 'En proceso';
                        }
                        return item;
                    });
                }
                console.log('user_services');
                console.log(responses[0].data)

                this.setState({
                    user_services: responses[0].data,
                });

            })
    }


    redirectAdd(generator) {
        if (generator) {
            this.props.history.push('/generator/services/add')
        } else {
            this.props.history.push('/admin/services/add')
        }
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {reload} = this.state;
        const {generator} = this.props;

        if (reload) {
            if (generator) {
                return <Redirect to='/generator/services'/>

            } else {
                return <Redirect to='/admin/services'/>
            }
        }
        return (
            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row gutter={12}>
                            <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="usersAssociated.title"/>
                                    </h1>
                                </PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                {this.state && this.state.user_services &&
                                <SortView tableInfo={tableinfos[0]} dataList={this.state.user_services}/>
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
