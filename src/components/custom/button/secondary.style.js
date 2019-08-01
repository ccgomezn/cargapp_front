import styled from 'styled-components';
import WithDirection from '../../../settings/withDirection';



const SecondaryButtonWrapper = styled.div`
.secondary {
         width: 130px !important;
          height: 45px !important;
          border-radius: 2px !important;
          border: solid 1.2px #0068ff !important;
          background-color: white !important;
          font-family: Roboto !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          font-style: normal !important;
          font-stretch: normal !important;
          line-height: normal !important;
          letter-spacing: -0.35px !important;
          color: #0068ff !important;
        }
`;

export default WithDirection(SecondaryButtonWrapper);