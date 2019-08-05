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
import { Redirect } from 'react-router-dom'

export default class State extends Component {


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

  getStates() {
    return axios.get(httpAddr + `/states`);
  }
  getCountries() {
    return axios.get(httpAddr + `/countries`);
  }

  componentWillMount() {
    axios.all([this.getStates(), this.getCountries()])
      .then((responses) => {

        let data_countries = this.transformDataToMap(responses[1].data, 'name')
        responses[0].data.map((item) => {
          if (item.active) {
            item.active = 'Activo';
            item.color = '#00BFBF';
          } else {
            item.active = 'Desactivado';
            item.color = '#ff2557';
          }
          item.country = data_countries[item.country_id]
          return item;

        })
        this.setState({
          states: responses[0].data
        });

      })
  }


  redirectAdd() {
    this.props.history.push('/dashboard/admin/states_add')
  }
  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { reload } = this.state;

    if (reload) {
      return <Redirect to='/dashboard/admin/states' />
    }
    return (
      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row gutter={12}>
              <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="states.title" />

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
                {this.state && this.state.states &&
                  <SortView tableInfo={tableinfos[1]} dataList={this.state.states} />
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
