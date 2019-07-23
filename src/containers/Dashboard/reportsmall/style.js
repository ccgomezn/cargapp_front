import styled from 'styled-components';
import { palette } from 'styled-theme';

const ReportWidgetWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #ffffff;
  border: 1px solid ${palette('border', 2)};
  height: 100% !important;
  .isoWidgetLabel {
    font-size: 21px;
    color: ${palette('text', 0)};
    font-weight: 400;
    line-height: 1.2;
    margin: 0 0 5px;
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
