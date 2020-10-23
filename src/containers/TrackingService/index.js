import React, { Component } from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import TableDemoStyle from './demo.style';
import fakeData from './fakeData';
import { tableinfos } from './configs';
import SortView from './tableViews/sortView';
import PageHeader from '../../components/utility/pageHeader';
import IntlMessages from '../../components/utility/intlMessages';
import { Row, Col, Slider } from 'antd';
import basicStyle from '../../settings/basicStyle';
import Input from "../../components/uielements/input";
import Button from "../../components/uielements/button";

const dataList = new fakeData(10);
export default class TrackingService extends Component {
  render() {
    
    const { rowStyle, colStyle } = basicStyle;

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="trackingsservice.title" />
                    <h2>
                      <IntlMessages id="trackings.subtitle" />
                    </h2>
                  </h1>
                </PageHeader>
              </Col>
              <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                <Button block style={{
                  height: 40,
                  backgroundColor: 'rgba(50,	95,	245)',
                  color: '#ffffff'
                }}>
                  <IntlMessages id="trackings.filter" />

                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>

                  <SortView tableInfo={tableinfos[1]} dataList={dataList} />
              </Col>
            </Row>

          </Col>

          <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
            <TableDemoStyle className="isoLayoutEditedContent">
              <div className="filter">
                <h1>
                  <IntlMessages id="trackings.filter" />
                </h1>
                <div className="content">
                  <div className="isoInputWrapper">
                    <label>
                      <IntlMessages id="trackings.freightquantity" />
                    </label>
                    <Slider defaultValue={30} />
                  </div>
                  <div className="isoInputWrapper">
                    <label>
                      <IntlMessages id="trackings.truckstate" />
                    </label>
                    <Input size="large" placeholder="Estado del camion" />
                  </div>
                  <div className="isoInputWrapper">
                    <label>
                      <IntlMessages id="trackings.driverrate" />
                    </label>
                    <Input size="large" placeholder="Calificación conductor" />
                  </div>
                </div>
              </div>

            </TableDemoStyle>
          </Col>
        </Row>




      </LayoutWrapper>
    );
  }
}
export {  tableinfos, dataList };
