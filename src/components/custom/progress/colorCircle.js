import React, { Component } from 'react';
import { Progress } from 'antd';
import { CircleProgressWidgetBar } from './style';
import 'antd/dist/antd.css';

export default class ColorCircleProgress extends Component {
  render() {
    const {  percent, barHeight, status, info } = this.props;
    return (

      <CircleProgressWidgetBar className="isoCircleProgress">
        <svg width="0" height="0">
          <defs>
            <linearGradient id="grad1">
              <stop offset="0%" stop-color="#007aff" />
              <stop offset="100%" stop-color="#00ff77" />
            </linearGradient>
          </defs>
        </svg>
        <Progress
          strokeColor="#007aff"
          type="circle"
          percent={percent}
          strokeWidth={barHeight}
          status={status}
          showInfo={info}
          format={percent =>

            <div className="content">

              <h1>{percent}</h1>
              <h2>CARGAPP SAS</h2>
            </div>}
        />

      </CircleProgressWidgetBar>
    );
  }
}
