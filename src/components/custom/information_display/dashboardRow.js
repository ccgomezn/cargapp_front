import React, { Component } from "react";
import IntlMessages from "../../utility/intlMessages";
import DashboardRowWrapper from './dashboardRow.style'
import {Row, Col, Icon} from 'antd';
export default class DashboardRow extends Component {
  render() {
    return (
      <DashboardRowWrapper>
        <Row style={{ marginTop: 4, align: "center" }} align={'middle'}>

          <Col span={12} style={{marginBottom: this.props.botMargin}}>
            <div className="titleDataReport">
              <h1>
                <IntlMessages id="widget.reportswidget.vehiculesonroad" />
              </h1>
              <div>
                <div className="subOrder">
                  <h2>
                    {this.props.mainInfo}
                  </h2>
                </div>
                <div className="subOrder">
                <p>
                    &nbsp;

                    <IntlMessages id={this.props.mainInfoSubId} />
                  </p>
                </div>

              </div>

            </div>
          </Col>
          <Col span={12} align={'right'}>

            <div className='tagDes' style={{
              backgroundColor: this.props.backgroundColor}}>
              <Icon type={this.props.subIcon} style={{ color: this.props.color}} />
              <h1 style={{ color: this.props.color }}>&nbsp;&nbsp;{this.props.subInfo}</h1>
            </div>

          </Col>
        </Row>
      </DashboardRowWrapper>
    )
  }
}