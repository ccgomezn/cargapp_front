import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '../../../settings/withDirection';

const VarSingleProgressWidgetBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 14px;
    color: ${palette('text', 2)};
    font-weight: 400;
    line-height: 1.2;
    margin: 0 0 5px;
  }

  .ant-progress-text {
    font-size: 13px;
    color: ${palette('text', 3)};
    font-weight: 400;
    line-height: 1.2;
    text-align: right;
    margin-left: ${props => (props['data-rtl'] === 'rtl' ? '0' : '0.75em')};
    margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0.75em' : '0')};
  }

  .ant-progress-show-info .ant-progress-outer {
    padding-right: 4em;
    margin-right: -4em;
  }
`;

const CircleProgressWidgetBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  h3 {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    color: ${palette('text', 2)};
    margin: 15px 0 0;
  }
  .ant-progress {
    margin-right: 22px !important;
   
  }
  
  .ant-progress.ant-progress-circle {
     
    
    .ant-progress-circle-path {
      stroke: url(#grad1) !important;
    }

    .ant-progress-text {
      h1 {
        font-family: Roboto;
          font-size: 28px;
          font-weight: 500;
          font-style: normal;
          font-stretch: normal;
          line-height: 0.93;
          letter-spacing: -0.7px;
          color: #010935;
      }
      h2 {
        opacity: 0.5;
        font-family: Roboto;
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.58;
        letter-spacing: -0.18px;
        color: #010935;
      }
      :after {
            content: '';
            position: absolute;
            left: 13px; 
            top: -25px;
            width: 94px;
            height: 94px;
            background-color: rgba(0, 104, 255, 0.05);
            z-index: -1;
            opacity: 1;
            border-radius: 50%;
          }
    }
  }
`;

const ProgressWidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${palette('border', 2)};

  
  .isoProgressWidgetTopbar {
    
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 11px;

    h3 {
      font-size: 19px;
      color: ${palette('text', 0)};
      font-weight: 400;
      margin: 0;
      line-height: 1.2;
    }

    i {
      font-size: 24px;
    }
  }

  .isoProgressWidgetBody {
    p {
      font-size: 14px;
      color: ${palette('text', 3)};
      font-weight: 300;
      width: 100%;
      margin: 0 0 5px;
    }
  }
`;

const SingleProgressWidgetBar = WithDirection(VarSingleProgressWidgetBar);

export {
  SingleProgressWidgetBar,
  CircleProgressWidgetBar,
  ProgressWidgetWrapper,
};
