import React, { Component } from "react";
import { Tag, Row, Col } from 'antd';
import RoundBadgeWrapper from './roundBadge.style'

export default class RoundBadge extends Component {
  render() {
    return (
      <RoundBadgeWrapper>
        <div className="optionsBooked">
          <Tag style={{ border: 'transparent', borderRadius: this.props.borderRadius, borderColor: 'transparent' }} color={this.props.color}>
            <Row align='middle' style={{height: '100%'}}>
              <Col span={24} style={{ height: '100%' }}>
                <div className="content" style={{ color: this.props.textColor, verticalAlign: 'middle', paddingTop: '7%' }}>
                  {this.props.data}
                </div>
              </Col>      
            </Row>      
          </Tag>
        </div>
      </RoundBadgeWrapper>
      
    );
  }
}
