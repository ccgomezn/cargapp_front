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
      .options {
        text-align: right !important;

        a {
          color: black;
        }
        h3 {
          font-size: 14px !important;
          text-transform: none !important;
        }
      }
      
      .titleBooked {
        h3 {
          color: black;
          font-size: 15px !important;
          text-transform: none !important;
          display: inline;
        }
        h2 {
          color: black;
          font-size: 15px !important;
          text-transform: none !important;
          display: inline;
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
