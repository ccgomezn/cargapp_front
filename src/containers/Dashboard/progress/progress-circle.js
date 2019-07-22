import React, { Component } from 'react';
import Progress from '../../../components/uielements/progress';
import { CircleProgressWidgetBar } from './style';

export default class CircleProgressWidget extends Component {
  render() {
    const { label, percent, barHeight, status, info, fontColor } = this.props;
    return (
      <CircleProgressWidgetBar className="isoCircleProgress">
        <Progress
          type="circle"
          percent={percent}
          strokeWidth={barHeight}
          status={status}
          showInfo={info}
          gapDegree={90}
          gapPosition={'bottom'}
          format={percent => 
          <div>
            <h1>{percent}</h1>
            <h2>CARGAPP SAS</h2>
          </div>}
        />
        
      </CircleProgressWidgetBar>
    );
  }
}
