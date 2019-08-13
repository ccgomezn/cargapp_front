import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import { tableinfos } from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import { Row, Col } from 'antd';
import basicStyle from '../../../settings/basicStyle';
import PrimaryButton from "../../../components/custom/button/primary";
import axios from "axios";
import httpAddr from "../../../helpers/http_helper"

export default class Status extends Component {


  constructor(props) {
    super();


  }


  transformDataToMap(data, key) {
    var dataTransformed = {};
    data.map((item) => {
      dataTransformed[item.id] = item[key];
      return item;
    });

    return dataTransformed
  }

  getStatus() {
    return axios.get(httpAddr + `/status`);
  }

  getUsers() {
    return axios.get(httpAddr + `/users`);
  }

  getCargappModels() {
    return axios.get(httpAddr + `/cargapp_models`);
  }

 
  componentWillMount() {
    axios.all([this.getStatus(), 
               this.getUsers(),
               this.getCargappModels()])
      .then((responses) => {
        var dataUser = this.transformDataToMap(responses[1].data, 'email');
        var dataCargappModels = this.transformDataToMap(responses[2].data, 'name');
        responses[0].data.map((item) => {
          if (item.active) {
            item.active = 'Activo';
            item.color = '#00BFBF';
          } else {
            item.active = 'Desactivado';
            item.color = '#ff2557';
          }
          item.user = dataUser[item.user_id]
          item.model = dataCargappModels[item.cargapp_model_id]

          return item;
        })
        this.setState({
          parameters: responses[0].data
        });

      })
  }


  redirectAdd() {
    this.props.history.push('/dashboard/admin/status/add')
  }
  render() {
    const { rowStyle, colStyle } = basicStyle;

    return (
      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row>
              <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="status.title" />

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
                {this.state && this.state.parameters &&
                  <SortView tableInfo={tableinfos[1]} dataList={this.state.parameters} />
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
