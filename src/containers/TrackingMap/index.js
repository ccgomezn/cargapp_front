import React, { Component } from 'react';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import TableDemoStyle from './demo.style';
import  MapContainer  from '../../components/maps/map'
import PageHeader from '../../components/utility/pageHeader';
import IntlMessages from '../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../settings/basicStyle';
import Input from "../../components/uielements/input";
import Button from "../../components/uielements/button";

export default class Tracking extends Component {


  static defaultMapProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

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
                    <IntlMessages id="trackings.title" />
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
                <div style={{ height: 600}}>
                <MapContainer block />

                </div>
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
                      <IntlMessages id="trackings.loadType" />
                    </label>
                    <Input size="large" placeholder="Tipo de carga" />
                  </div>
                  <div className="isoInputWrapper">
                    <label>
                      <IntlMessages id="trackings.state" />
                    </label>
                    <Input size="large" placeholder="Estado" />
                  </div>
                  <div className="isoInputWrapper">
                    <label>
                      <IntlMessages id="trackings.destiny" />
                    </label>
                    <Input size="large" placeholder="Destino" />
                  </div>
                  <div className="isoInputWrapper">
                    <label>
                      <IntlMessages id="trackings.initialDate" />
                    </label>
                    <Input size="large" placeholder="Fecha de recogida" />
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