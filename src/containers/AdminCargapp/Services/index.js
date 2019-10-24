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
import {getServices} from '../../../helpers/api/adminCalls.js';
import {
    getActiveServices,
    getStatusOfModel,
    getMineServices,
    getServicesOfDriver, getActiveModels
} from "../../../helpers/api/adminCalls";

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
            }
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
                        let status_data = this.transformDataToMap(responses[1].data, 'name');
                        responses[0].data.map((item) => {
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
                    }
                    this.setState({
                        services: active_services ? this.getActiveServices(responses[0].data) : responses[0].data
                    });

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
        const {generator, vehicle_manager} = this.props;
        let tableinforeal = generator ? tableinfos[2] : vehicle_manager? tableinfos[3]: tableinfos[1];

        if (reload) {
            if (generator) {
                return <Redirect to='/generator/services'/>

            } else if(vehicle_manager){
                return <Redirect to='/vehicle_manager/services'/>

            }else{
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
                                    !vehicle_manager && <PrimaryButton
                                        message_id={"general.add"}
                                        style={{width: '100%'}}
                                        onClick={() => this.redirectAdd(generator)}/>
                                }

                            </Col>
                        </Row>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                {this.state && this.state.services &&
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
