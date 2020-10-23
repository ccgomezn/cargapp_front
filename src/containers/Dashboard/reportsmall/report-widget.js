import React, {Component} from 'react';
import {ReportWidgetWrapper} from './style';
import {Row, Col} from 'antd'

export default class extends Component {
    render() {
        const {label, children, options, hr} = this.props;
        return (
            <ReportWidgetWrapper className="isoReportsWidget">
                <Row className="titleHead">
                    {options ? <Col span={12}>
                        <h3 className="isoWidgetLabel">{label}</h3>
                    </Col> : <Col span={24}>
                        <h3 className="isoWidgetLabel">{label}</h3>
                    </Col>}

                    <Col span={12} align={'right'}>
                        {options}
                    </Col>
                </Row>
                {hr}
                <div className="isoReportsWidgetBar">{children}</div>

            </ReportWidgetWrapper>
        );
    }
}
