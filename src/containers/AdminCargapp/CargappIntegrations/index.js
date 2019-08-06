import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import { tableinfos } from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../settings/basicStyle';
import PrimaryButton from "../../../components/custom/button/primary";
import SecondaryButton from "../../../components/custom/button/secondary";
import axios from "axios";
import httpAddr from "../../../helpers/http_helper"
import { Redirect } from 'react-router-dom'

export default class CargappIntegration extends Component {


  constructor(props) {
    super();
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

  getIntegrations() {
    return axios.get(httpAddr + `/cargapp_integrations`);
  }

  


  componentWillMount() {
    axios.all([this.getIntegrations()])
      .then((responses) => {
        responses[0].data.map((item) => {
          if (item.active) {
            item.active = 'Activo';
            item.color = '#00BFBF';
          } else {
            item.active = 'Desactivado';
            item.color = '#ff2557';
          }
          return item;
        })
        this.setState({
          cargapp_integrations: responses[0].data
        });

      })
  }


  redirectAdd() {
    this.props.history.push('/dashboard/admin/cargapp_integrations_add')
  }
  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { reload } = this.state;

    if (reload) {
      return <Redirect to='/dashboard/admin/cargapp_integrations' />
    }
    return (
      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row gutter={12}>
              <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="cargappIntegrations.title" />

                  </h1>
                </PageHeader>
              </Col>
              
              <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                <PrimaryButton
                  message_id={"general.add"}
                  style={{ width: '100%' }}
                  onClick={() => this.redirectAdd()} />
              </Col>
            </Row>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                {this.state && this.state.cargapp_integrations &&
                  <SortView tableInfo={tableinfos[1]} dataList={this.state.cargapp_integrations} />
                }
              </Col>
            </Row>

          </Col>
        </Row>




      </LayoutWrapper>
    );
  }
}
export { tableinfos };
