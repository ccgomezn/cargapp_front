import styled from 'styled-components';
import { palette } from 'styled-theme';

const ReportWidgetWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 19px;
  padding-right: 19px;
  padding-top: 28px;
  background-color: #ffffff;
  border: 1px solid ${palette('border', 2)};
  height: 100% !important;

  hr {
    width: 100%;
  height: 1px;
  background-color: rgb(236, 240, 241);
  border: 1px solid transparent !important
  }
  .isoWidgetLabel {
    font-size: 21px;
    color: ${palette('text', 0)};
    font-weight: 400;
    line-height: 1.2;
  }
  .ant-list-item {
      .ant-list-item-meta {
        .ant-list-item-meta-content {
          a {
            font-family: Roboto !important;
            font-size: 14px !important;
            font-weight: 500 !important;
            font-style: normal !important;
            font-stretch: normal !important;
            line-height: normal !important;
            letter-spacing: -0.2px !important;
            color: #010935 !important;
          }
          .ant-list-item-meta-description {
            opacity: 0.5;
            font-family: Roboto;
            font-size: 14px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: -0.2px;
            color: #010935;
          }
        }

        
      }
      .options {
        text-align: right !important;

        a {
            font-family: Roboto;
            font-size: 14px;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: -0.2px;
            text-align: right;
            color: #0168ff !important;
          }
        h3 {
          opacity: 0.5;
          font-family: Roboto;
          font-size: 14px;
          font-weight: normal;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: -0.2px;
          text-align: right;
          color: #010935;
        }
      }
      
      .titleBooked {
        h3 {
          font-family: Roboto;
          font-size: 14px;
          font-weight: 500;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: -0.2px;
          color: #010935;
        }
        
      }
  }
  .isoReportsWidgetBar {
    display: flex;
    flex-direction: column;

    .isoSingleProgressBar {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export { ReportWidgetWrapper };
