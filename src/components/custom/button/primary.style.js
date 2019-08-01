import styled from 'styled-components';
import WithDirection from '../../../settings/withDirection';



const PrimaryButtonWrapper = styled.div`

.primary {
          
          border: 0px solid transparent !important;
         width: 130px;
          height: 45px !important;
          border-radius: 2px !important; 
          background-image: radial-gradient(circle at 10% 12%, #007aff, #00ff77) !important;
          font-family: Roboto !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          font-style: normal !important;
          font-stretch: normal !important;
          line-height: normal !important;
          letter-spacing: -0.35px !important;
          text-align: center !important;
          color: white !important;
          z-index: 2 !important;
          :after {
            content: '' !important;
            position: absolute !important;
            left: 9px !important; 
            top: 13px !important; 
            width: 90% !important;
            z-index: -1 !important;
            height: 39px !important;
            opacity: 0.44 !important;
            border-radius: 2px !important;
            -webkit-filter: blur(10px) !important;
            filter: blur(10px) !important;
            background-image: radial-gradient(circle at 12% 15%, #007aff, #00ff77) !important;
          }
        }
`;

export default WithDirection(PrimaryButtonWrapper);