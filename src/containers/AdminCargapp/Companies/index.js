import React, { Component } from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';
import { tableinfos } from './configs';
import SortView from '../../../components/custom/table/sortView';
import PageHeader from '../../../components/utility/pageHeader';
import IntlMessages from '../../../components/utility/intlMessages';
import { Row, Col, Tabs } from 'antd';
import basicStyle from '../../../settings/basicStyle';
import axios from "axios";
import { Redirect } from 'react-router-dom'
import { getCompanies } from "../../../helpers/api/companies";
import SecondaryButton from "../../../components/custom/button/secondary";
const { TabPane } = Tabs;
export default class Company extends Component {


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

  componentWillMount() {
    axios.all([getCompanies()])
      .then((responses) => {
        if (responses[0] !== undefined) {
          responses[0].data.map((item) => {
            if (item.active) {
              item.active = 'Activo';
              item.color = '#00BFBF';
            } else {
              item.active = 'Desactivado';
              item.color = '#ff2557';
            }
            return item;
          });
          let active = [];
          let inactive = [];
          responses[0].data.forEach(item => {
            if (item.active === 'Activo') active.push(item);
            else inactive.push(item);
          });
          this.setState({
            companies: active,
            inactive
          });
        }


      })
  }


  redirectAdd() {
    this.props.history.push('/admin/companies/add')
  }

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { reload } = this.state;

    if (reload) {
      return <Redirect to='/admin/companies' />
    }
    return (
      <LayoutWrapper>


        <Row style={rowStyle} gutter={18} justify="start" block>
          <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
            <Row gutter={12}>
              <Col lg={18} md={24} sm={24} xs={24} style={colStyle}>
                <PageHeader>

                  <h1>
                    <IntlMessages id="companies.title" />

                  </h1>
                </PageHeader>
              </Col>

              <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                <SecondaryButton
                  message_id={"general.add"}
                  style={{ width: '100%' }}
                  onClick={() => this.redirectAdd()} />
              </Col>
            </Row>
            <Row>
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                {this.state && this.state.companies &&
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Activo" key="1">
                      {this.state && this.state.companies &&
                        <SortView tableInfo={tableinfos[1]} dataList={this.state.companies} />
                      }
                    </TabPane>
                    <TabPane tab="Inactivo" key="2">
                      {this.state && this.state.inactive &&
                        <SortView tableInfo={tableinfos[1]} dataList={this.state.inactive} />
                      }
                    </TabPane>

                  </Tabs>
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
