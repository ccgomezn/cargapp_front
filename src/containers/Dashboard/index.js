import React, {Component} from 'react';
import {Row, Col} from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import basicStyle from '../../settings/basicStyle';
import IsoWidgetsCircleWrapper from './widgets-circle-wrapper';
import IsoWidgetsWrapper from './widgets-wrapper';
import ColorCircleProgress from '../../components/custom/progress/colorCircle';
import ReportsSmallWidget from './reportsmall/report-widget';
import ReportMapWidget from './reportmap/report-widget';
import {Divider} from 'antd';
import {Link} from "react-router-dom";
import {tableinfos} from './tablesConfig'
import IntlMessages from '../../components/utility/intlMessages';
import MapContainer from '../../components/maps/map';
import {List, Avatar, Skeleton} from 'antd';
import DashboardRow from '../../components/custom/information_display/dashboardRow';
import reqwest from 'reqwest';
import SimpleView from '../../components/custom/table/simpleView'
import fakeData from '../Tables/fakeData';
import ResponsiveLineChart from '../../components/custom/chart/responsiveLineChart'
import axios from "axios";
import {getMineServices} from "../../helpers/api/services";
import {getActiveStatus} from "../../helpers/api/internals";

const tableDataList = new fakeData(10);
tableDataList.size = 5;
const count = 3;

const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

export default class extends Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
        map: true
    };
    _isMounted = false;


    componentDidMount() {
        this._isMounted = true;

        axios.all([getMineServices(), getActiveStatus()]).then((responses) => {
            let markers = [];
            let status_data = {};
            let ongoing = [];
            let booked = [];
            responses[1].data.map((status) => {
                status_data[status.id] = [status.code, status.name];
                return status.id;
            });
            responses[0].data.map((service) => {
                service.status = status_data[service.statu_id][1];
                markers.push({
                    direction: {
                        origin: service.origin_latitude + ', ' + service.origin_longitude,
                        destination: service.destination_latitude + ', ' + service.destination_longitude
                    }
                });
                if (status_data[service.statu_id][0] !== 'Closed' && status_data[service.statu_id][0] !== 'PendingForApproval') {
                    ongoing.push(service);
                } else if (status_data[service.statu_id][0] === 'PendingForApproval') {
                    booked.push(service);
                }
                return service;
            });
            this.setState({
                markers: markers,
                ongoing: ongoing,
                booked: booked
            })


        });

        this.getData(res => {
            if (this._isMounted) {

                this.setState({
                    initLoading: false,
                    data: res.results,
                    list: res.results,
                });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.setState({map: false})
    }

    getData = callback => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                callback(res);
            },
        });
    };


    render() {
        const {list} = this.state;

        const {rowStyle, colStyle} = basicStyle;
        const wisgetPageStyle = {
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'flex-start',
            overflow: 'hidden',
        };

        return (
            <LayoutWrapper id="area">
                <div style={wisgetPageStyle}>
                    <Row style={rowStyle} gutter={0} justify="start" type="flex">
                        <Col lg={8} md={8} sm={24} xs={24} style={colStyle}>
                            <Row>
                                <IsoWidgetsCircleWrapper>
                                    {/* Report Widget */}
                                    <ReportsSmallWidget>
                                        <Row>
                                            <Col lg={10} md={10} sm={24} xs={24}>
                                                <ColorCircleProgress

                                                    percent={70}
                                                    status="active"
                                                    info={true} // Boolean: true, false
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <div className="titleReport">
                                                    <h1>
                                                        <IntlMessages id="widget.reportswidget.titledashboard"/>
                                                    </h1>
                                                    <h2 style={{padding: '10px 0px 30px 19px'}}>
                                                        <IntlMessages id="general.booked"/>
                                                    </h2>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Divider orientation="left" style={{marginTop: '0px'}}></Divider>
                                        <DashboardRow mainInfo={this.state.ongoing ? this.state.ongoing.length : ''}
                                                      mainInfoSubId={
                                                          this.state.ongoing && this.state.ongoing.length !== 1 ? 'widget.reportswidget.vehicules' : 'widget.reportswidget.vehicule'
                                                      }
                                                      subIcon={'fall'}
                                                      subInfo={'-7,6%'}
                                                      backgroundColor={'rgb(255, 37, 87, 0.25)'}
                                                      color={'rgb(255, 37, 87)'}
                                                      botMargin={4}/>
                                        <Divider orientation="left"></Divider>
                                        <DashboardRow mainInfo={this.state.booked ? this.state.booked.length : ''}
                                                      mainInfoSubId={
                                                          this.state.ongoing && this.state.ongoing.length !== 1 ? 'widget.reportswidget.services' : 'widget.reportswidget.service'
                                                      }
                                                      subIcon={'rise'}
                                                      subInfo={'+2,4%'}
                                                      backgroundColor={'rgb(0, 255, 119, 0.25)'}
                                                      color={'rgb(0, 211, 98)'}
                                                      botMargin={37}/>
                                    </ReportsSmallWidget>

                                </IsoWidgetsCircleWrapper>
                            </Row>

                        </Col>
                        <Col lg={16} md={16} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper style={{height: '100% !important'}}>
                                <div className="vehiclesOnTrack" style={{height: '100%'}}>
                                    <ReportsSmallWidget
                                        label={<IntlMessages id="widget.reportswidget.titleactualtravels"/>}
                                        options={
                                            <Link style={{
                                                color: '#0168ff', textTransform: 'uppercase'
                                            }} to="/admin/services"><IntlMessages id="dashboard.onroad.showall"/></Link>

                                        }
                                        hr={<hr style={{marginTop: 0}}/>}
                                    >

                                        {this.state.ongoing &&
                                        <SimpleView tableInfo={tableinfos[0]} dataSource={this.state.ongoing}/>}
                                    </ReportsSmallWidget>
                                </div>
                            </IsoWidgetsWrapper>

                        </Col>

                    </Row>
                    {this.state.map &&
                    <Row style={rowStyle} gutter={0} justify="start">
                        <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <ReportMapWidget
                                    label={<IntlMessages id="widget.reportswidget.titleservice"/>}
                                >
                                    <div style={{height: 500, width: '100%'}}>
                                        <Row>
                                            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                                                <MapContainer center={{
                                                    lat: 4.710989,
                                                    lng: -74.072090
                                                }} block style={{height: 500}} isFreight={true}
                                                              direction={this.state.direction}/>
                                            </Col>

                                        </Row>

                                    </div>

                                </ReportMapWidget>
                            </IsoWidgetsWrapper>
                        </Col>
                    </Row>}

                    <Row style={rowStyle} gutter={0} justify="start">
                        <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                <ReportsSmallWidget
                                    label={<IntlMessages id="widget.reportswidget.analitycs"/>}

                                    hr={<hr style={{marginTop: 0}}/>}
                                >
                                    <ResponsiveLineChart data={
                                        [
                                            {x: 1, y: 130},
                                            {x: 2, y: 165},
                                            {x: 3, y: -142},
                                            {x: 4, y: 19}
                                        ]
                                    } style={{width: '100%'}}/>
                                </ReportsSmallWidget>
                            </IsoWidgetsWrapper>
                        </Col>
                    </Row>

                    <Row style={rowStyle} gutter={0} justify="start">
                        <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper style={{height: '100% !important'}}>
                                <div className="vehiclesOnTrack" style={{height: '100%'}}>
                                    <ReportsSmallWidget
                                        label={<IntlMessages id="widget.reportswidget.activeusers"/>}
                                        hr={<hr style={{marginTop: 0}}/>}
                                    >

                                        <List
                                            className="demo-loadmore-list"
                                            itemLayout="horizontal"
                                            dataSource={list}
                                            renderItem={item => (
                                                <List.Item
                                                    actions={[<div className="options"><a href='/'>ver permisos</a><h3>3
                                                        servicios</h3></div>]}>
                                                    <Skeleton avatar title={false} loading={item.loading} active>
                                                        <List.Item.Meta
                                                            avatar={
                                                                <Avatar
                                                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                                            }
                                                            title={<a href="https://ant.design">{item.name.last}</a>}
                                                            description="Operador logístico"
                                                        />
                                                    </Skeleton>
                                                </List.Item>
                                            )}
                                        />
                                    </ReportsSmallWidget>
                                </div>
                            </IsoWidgetsWrapper>

                        </Col>


                        <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper style={{height: '100% !important'}}>
                                <div className="vehiclesOnTrack" style={{height: '100%'}}>
                                    <ReportsSmallWidget
                                        label={<IntlMessages id="widget.reportswidget.titleBooked"/>}
                                        options={
                                            <Link style={{
                                                color: '#0168ff', textTransform: 'uppercase'
                                            }} to="/admin/services"><IntlMessages id="dashboard.onroad.showall"/></Link>

                                        }
                                        hr={<hr style={{marginTop: 0}}/>}
                                    >

                                        {this.state.ongoing &&
                                        <SimpleView tableInfo={tableinfos[2]} dataSource={this.state.booked}/>}
                                    </ReportsSmallWidget>
                                </div>
                            </IsoWidgetsWrapper>

                        </Col>

                    </Row>


                </div>
            </LayoutWrapper>
        );
    }
}
