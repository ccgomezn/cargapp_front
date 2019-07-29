import React, { Component } from 'react';
import clone from 'clone';
import { Row, Col, Icon } from 'antd';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import basicStyle from '../../settings/basicStyle';
import IsoWidgetsCircleWrapper from './widgets-circle-wrapper';
import IsoWidgetsWrapper from './widgets-wrapper';
import ColorCircleProgress from '../../components/custom/progress/colorCircle';
import ReportsSmallWidget from './reportsmall/report-widget';
import ReportMapWidget from './reportmap/report-widget';
import { Divider } from 'antd';

import { TableViews, tableinfos, dataList } from '../Tables/antTables';
import * as rechartConfigs from '../Charts/recharts/config';
import { GoogleChart } from './googleChart/';
import * as googleChartConfigs from './googleChart/config';
import IntlMessages from '../../components/utility/intlMessages';
import MapContainer from '../../components/maps/map';
import { List, Avatar, Skeleton, Checkbox, Tag } from 'antd';
import reqwest from 'reqwest';

const tableDataList = clone(dataList);
tableDataList.size = 5;
const count = 3;

const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

export default class extends Component {
  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
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
    const { initLoading, loading, list } = this.state;

    const { rowStyle, colStyle } = basicStyle;
    const wisgetPageStyle = {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      overflow: 'hidden',
    };

    const chartEvents = [
      {
        eventName: 'select',
        callback(Chart) { },
      },
    ];

    const stackConfig = {
      ...rechartConfigs.StackedAreaChart,
      width: window.innerWidth < 450 ? 300 : 500,
    };
    return (
      <LayoutWrapper id="area">
        <div style={wisgetPageStyle}>
          <Row style={rowStyle} gutter={0} justify="start" type="flex">
            <Col lg={8} md={8} sm={24} xs={24} style={colStyle}>
              <Row >
                <IsoWidgetsCircleWrapper>
                  {/* Report Widget */}
                  <ReportsSmallWidget
                  >
                    <Row>
                      <Col lg={10} md={10} sm={24} xs={24}>
                        <ColorCircleProgress

                          percent={70}
                          barHeight={6}
                          status="active"
                          info={true} // Boolean: true, false
                        />
                      </Col>
                      <Col span={12}>
                        <div className="titleReport">
                          <h1>
                            <IntlMessages id="widget.reportswidget.titledashboard" />
                          </h1>
                          <h2>
                            <IntlMessages id="widget.reportswidget.subtitledashboard" />
                          </h2>
                        </div>
                      </Col>
                    </Row >
                    <Divider orientation="left"></Divider>

                    <Row style={{ marginTop: 34 }}>
                      
                      <Col span={12}>
                        <div className="titleDataReport">
                          <h1>
                            <IntlMessages id="widget.reportswidget.vehiculesonroad" />
                          </h1>
                          <div>
                            <div className="subOrder">
                              <h2>
                                1.428
                            </h2>
                            </div>
                            <div className="subOrder">
                              <p>{" "}</p>

                              <p>
                                <IntlMessages id="widget.reportswidget.vehicules" />
                              </p>
                            </div>

                          </div>

                        </div>
                      </Col>
                      <Col span={12} align={'right'}>
                        <Tag color="#ff2557" style={{
                          opacity: 0.25,
                          width: 76.8,
                          height: 26.4,
                          opacity: 0.25,
                          borderRadius: 2.4,
                        }}><Icon type="fall" style={{
                          width: 8.4px;
                          height: 8.4px;
                          border: solid 1.8px #ff2557;}}/> -7,6%</Tag>

                      </Col>
                    </Row>
                  </ReportsSmallWidget>

                </IsoWidgetsCircleWrapper>
              </Row>
              <Row style={{ paddingTop: 20 }}>
                <Col span={12}>
                  <IsoWidgetsWrapper>
                    <div className="vehiclesOnTrack">
                      <ReportsSmallWidget
                        label={<IntlMessages id="widget.reportswidget.titlevehiclesontrack" />}
                      >
                        <div className="data">

                          <h4>1,428 </h4>
                          <h5>
                            <IntlMessages id="widget.reportswidget.datavehiclesontrack" />
                          </h5>
                        </div>
                      </ReportsSmallWidget>
                    </div>
                  </IsoWidgetsWrapper>
                </Col>
                <Col span={12}>
                  <IsoWidgetsWrapper>
                    <div className="vehiclesOnTrack">
                      <ReportsSmallWidget
                        label={<IntlMessages id="widget.reportswidget.titledistance" />}
                      >
                        <div className="data">

                          <h4>158.3 </h4>
                          <h5>
                            <IntlMessages id="widget.reportswidget.milles" />
                          </h5>
                        </div>
                      </ReportsSmallWidget>
                    </div>
                  </IsoWidgetsWrapper>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper style={{ height: '100% !important' }}>
                <div className="vehiclesOnTrack" style={{ height: '100%' }}>
                  <ReportsSmallWidget
                    label={<IntlMessages id="widget.reportswidget.titleactualtravels" />}
                  >

                    <List
                      className="demo-loadmore-list"
                      itemLayout="horizontal"
                      dataSource={list}
                      renderItem={item => (
                        <List.Item actions={[<div className="options"><a>ver en mapa</a><h3>llega en 2 dias</h3></div>]}>
                          <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                              avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                              }
                              title={<a href="https://ant.design">{item.name.last}</a>}
                              description="Destino-carga"
                            />
                          </Skeleton>
                        </List.Item>
                      )}
                    />
                  </ReportsSmallWidget>
                </div>
              </IsoWidgetsWrapper>

            </Col>

          </Row>

          <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
              <IsoWidgetsWrapper>
                {/* Sticker Widget */}
                <ReportMapWidget
                  label={<IntlMessages id="widget.reportswidget.titleservice" />}
                >
                  <div style={{ height: 500, width: '100%' }}>
                    <Row>
                      <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <MapContainer block style={{ height: 500 }} isFreight={true} />
                      </Col>

                    </Row>

                  </div>

                </ReportMapWidget>
              </IsoWidgetsWrapper>
            </Col>
          </Row>

          <Row style={rowStyle} gutter={0} justify="start">
            <Col lg={8} md={8} sm={8} xs={24} style={colStyle}>
              <IsoWidgetsWrapper style={{ height: '100% !important' }}>
                <div className="vehiclesOnTrack" style={{ height: '100%' }}>
                  <ReportsSmallWidget
                    label={<IntlMessages id="widget.reportswidget.activeusers" />}
                  >

                    <List
                      className="demo-loadmore-list"
                      itemLayout="horizontal"
                      dataSource={list}
                      renderItem={item => (
                        <List.Item actions={[<div className="options"><a>ver permisos</a><h3>3 servicios</h3></div>]}>
                          <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                              avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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

            <Col lg={8} md={8} sm={8} xs={24} style={colStyle}>
              <IsoWidgetsWrapper >
                <div className="vehiclesOnTrack" style={{ height: '100%' }}>

                  <ReportsSmallWidget
                    label={<IntlMessages id="widget.reportswidget.activeusers" />}
                  >
                    {/* Google Bar Chart */}
                    <GoogleChart {...googleChartConfigs.ComboChart} />
                  </ReportsSmallWidget>
                </div>
              </IsoWidgetsWrapper>
            </Col>

            <Col lg={8} md={8} sm={8} xs={24} style={colStyle}>
              <IsoWidgetsWrapper >
                <div className="vehiclesOnTrack" style={{ height: '100%' }}>

                  <ReportsSmallWidget
                    label={<IntlMessages id="widget.reportswidget.booked" />}
                  >
                    <List
                      className="demo-loadmore-list"
                      itemLayout="horizontal"
                      dataSource={list}
                      renderItem={item => (
                        <List.Item actions={[<div className="optionsBokked"><Tag style={{ zoom: 1.3, border: 'transparent', borderColor: 'transparent' }} color="blue">
                          12/15/19
                          </Tag></div>]}>
                          <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                              avatar={
                                <Checkbox
                                >
                                </Checkbox>
                              }
                              title={<div className="titleBooked">
                                <h3>Destino-</h3>
                                <h2>Carga</h2>
                              </div>}
                            />
                          </Skeleton>
                        </List.Item>
                      )}
                    />
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
