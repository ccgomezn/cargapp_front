import React, { Component } from 'react';
import Tabs, { TabPane } from '../../components/uielements/tabs';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import TableDemoStyle from './demo.style';
import { tableinfos } from './configs';
import PageHeader from '../../components/utility/pageHeader';
import IntlMessages from '../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../settings/basicStyle';
import Input from "../../components/uielements/input";

export default class Tracking extends Component {
  render() {
    const wisgetPageStyle = {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'flex-start',
      overflow: 'hidden',
    };
    const { rowStyle, colStyle } = basicStyle;

    return (
      <LayoutWrapper>
        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <PageHeader>

                <h1>
                  <IntlMessages id="trackings.map.title" />
                  <h2>
                    <IntlMessages id="trackings.subtitle" />
                  </h2>
                </h1>
              </PageHeader>
            </Row>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                  <iframe class="iframe" width="100%" height="500px" src="https://www.openstreetmap.org/export/embed.html?bbox=-82.55264282226564%2C22.971353928229505%2C-82.19009399414064%2C23.200960808078566&layer=mapnik"></iframe>
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
