import styled from 'styled-components';
import { palette } from 'styled-theme';

const ReportWidgetWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  background-color: #ffffff;
  border: 1px solid ${palette('border', 2)};
  h3 {
      font-size: 13px !important;
      font-weight: 400 !important;
      color: rgba(140,	154,	173	) !important;
      text-transform: uppercase;
      padding-bottom: 20px;
  }
  .isoWidgetLabel {
    font-size: 21px;
    color: ${palette('text', 0)};
    font-weight: 400;
    line-height: 1.2;
    margin: 0 0 5px;
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
