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
import MapContainer from "../../../components/maps/map";
import {getUserLocations, getUsers} from "../../../helpers/api/users";
import {getCities} from "../../../helpers/api/locations";

export default class UserLocation extends Component {


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


    componentWillMount() {

        axios.all([getUserLocations(), getCities(), getUsers()])
            .then((responses) => {
                let locations = [];
                if (responses[0] !== undefined) {
                    let data_cities = this.transformDataToMap(responses[1].data, 'name');
                    let data_users = this.transformDataToMap(responses[2].data, 'email');
                    responses[0].data.map((item) => {
                        locations.push({position: {lat: parseInt(item.latitude), lng: parseInt(item.longitude)}});
                        if (item.active) {
                            item.active = 'Activo';
                            item.color = '#00BFBF';
                        } else {
                            item.active = 'Desactivado';
                            item.color = '#ff2557';
                        }
                        item.city = data_cities[item.city_id];
                        item.user = data_users[item.user_id];
                        return item;
                    });
                    this.setState({
                        user_locations: responses[0].data,
                        locations: locations
                    });
                }
            })
    }


    redirectAdd() {
        this.props.history.push('/admin/user_locations/add')
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {reload} = this.state;

        if (reload) {
            return <Redirect to='/admin/user_locations'/>
        }
        return (
            <LayoutWrapper>


                <Row style={rowStyle} gutter={18} justify="start" block>
                    <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <Row gutter={12}>
                            <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                                <PageHeader>

                                    <h1>
                                        <IntlMessages id="userLocations.title"/>

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
                        <div style={{height: 500, width: '100%'}}>
                            <Row>
                                <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                    <MapContainer center={{
                                        lat: 4.710989,
                                        lng: -74.072090
                                    }} block style={{height: 500}} markers={this.state.locations}/>
                                </Col>

                            </Row>

                        </div>
                        <Row>
                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                {this.state && this.state.user_locations &&
                                <SortView tableInfo={tableinfos[1]} dataList={this.state.user_locations}/>
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
