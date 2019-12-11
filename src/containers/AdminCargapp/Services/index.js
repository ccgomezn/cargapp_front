import React, {Component} from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import {tableinfos} from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import {Row, Col} from 'antd';
import basicStyle from '../../../settings/basicStyle';
import axios from "axios";
import {Redirect} from 'react-router-dom'
import {getActiveServices, getMineServices, getServices, getServicesOfDriver} from "../../../helpers/api/services";
import {getActiveModels, getStatusOfModel} from "../../../helpers/api/internals";
import SecondaryButton from "../../../components/custom/button/secondary";
import { Tabs } from 'antd';

const { TabPane } = Tabs;
export default class Service extends Component {


    constructor(props) {
        super(props);
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


    getActiveServices(data) {
        let data_transformed = [];
        data.forEach((service) => {
            if (service.statu_id !== 10 && service.statu_id !== 11) {
                data_transformed.push(service);
            }
        });
        return data_transformed;
    }

    componentWillMount() {
        const {id} = this.props.match.params;
        const {generator, active_services, vehicle_manager} = this.props;
        let getServicesFunction = function () {
            return getServices();
        };
        if (id !== null && id !== undefined) {
            getServicesFunction = function () {
                return getServicesOfDriver(
                    id
                );
            };
        } else if (generator) {
            getServicesFunction = function () {
                return getMineServices(id);
            }
        } else if (vehicle_manager) {

            getServicesFunction = function () {
                return getActiveServices();
            }
        }
        getActiveModels().then(response => {
            let model_id = '';

            response.data.forEach(model => {
                if (model.code === 'SERVICE') {
                    model_id = model.id
                }
            });
            axios.all([getServicesFunction(), getStatusOfModel(model_id)])
                .then((responses) => {
                    if (responses[0] !== undefined) {
                        let activeServices = [];
                        let nonActiveServices = [];
                        let status_data = this.transformDataToMap(responses[1].data, 'name');
                        responses[0].data.map((item) => {
                            if(item.active){
                                activeServices.push(item);
                            }else{
                                nonActiveServices.push(item);
                            }

                            if (item.active) {
                                item.active = 'Activo';
                                item.color = '#00BFBF';
                            } else {
                                item.active = 'Desactivado';
                                item.color = '#ff2557';
                            }
                            item.status = status_data[item.statu_id];
                            return item;
                        });
                        if (vehicle_manager && (id === null || id === undefined)) {
                            let realServices = [];
                            responses[0].data.forEach(service => {
                                if (service.statu_id === 10 && service.active) {
                                    realServices.push(service);
                                }
                            });
                            this.setState({
                                services: realServices
                            });
                        } else if(active_services) {
                            this.setState({services: this.getActiveServices(responses[0].data)});
                        }else{
                            this.setState({services: activeServices, nonActiveServices: nonActiveServices});
                        }
                    }



                })
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
        const {id} = this.props.match.params;
        const {generator, vehicle_manager, active_services} = this.props;
        let tableinforeal = generator ? tableinfos[2] : vehicle_manager ? id ? tableinfos[0] : tableinfos[3] : tableinfos[1];
        if (reload) {
            if (generator) {
                return <Redirect to='/generator/services'/>

            } else if (vehicle_manager) {
                return <Redirect to='/vehicle_manager/services'/>

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
                                        <IntlMessages id="services.title"/>

                                    </h1>
                                </PageHeader>
                            </Col>

                            <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                                {
                                    !vehicle_manager && <SecondaryButton
                                        message_id={"general.add"}
                                        style={{width: '100%'}}
                                        onClick={() => this.redirectAdd(generator)}/>
                                }

                            </Col>
                        </Row>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                {!vehicle_manager && !active_services &&
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Activo" key="1">
                                        {this.state && this.state.services &&
                                        <SortView tableInfo={tableinforeal} dataList={this.state.services}/>
                                        }
                                    </TabPane>
                                    <TabPane tab="Inactivo" key="2">
                                        {this.state && this.state.nonActiveServices &&
                                        <SortView tableInfo={tableinforeal} dataList={this.state.nonActiveServices}/>
                                        }
                                    </TabPane>

                                </Tabs>

                                }
                                {(vehicle_manager || active_services) && this.state && this.state.services &&
                                <SortView tableInfo={tableinforeal} dataList={this.state.services}/>
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
