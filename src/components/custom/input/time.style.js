import styled from 'styled-components';
import WithDirection from '../../../settings/withDirection';



const TextWrapper = styled.div`
textarea {
            padding: 26px 12px 13px 10px !important;

}

.ant-time-picker {
  width: 100% !important;
}
input
        {
        margin-top: 3px;
          padding: 26px 12px 13px 10px !important;

          width: 100% !important;
          height: 55px !important;
          border-radius: 2px !important;
          border: solid 1.2px #ecf0f1 !important;
          background-color: var(--white) !important;
          font-family: Roboto !important;
          font-size: 14px !important;
          font-weight: normal !important;
          font-style: normal !important;
          font-stretch: normal !important;
          line-height: normal !important;
          letter-spacing: -0.35px !important;
          color: #010935 !important;

          :focus {
            border-left: 2px solid transparent !important;
            background-image: radial-gradient(circle at 236% 0, #ff2557, #320d8e) !important;
            background-size: 2px calc(100% + 4px) !important; /* 4px extra to cater for 2px border on right + 2px on left */
            background-repeat: no-repeat !important;
            background-origin: border-box !important; /* make background start from border area itself instead of content/padding area */
            background-position: bottom left !important;
            box-sizing: border-box !important !important;
  
          }
          
        }
        
        input:-webkit-autofill {
            background-color: red !important;
        }
        
        label {
          transition: // not padding
            background 0.2s,
            color 0.2s,
            top 0.2s,
            bottom 0.2s,
            right 0.2s,
            left 0.2s !important;
          position: absolute !important;
          opacity: 0.5 !important;
          font-family: Roboto !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          font-style: normal !important;
          font-stretch: normal !important;
          line-height: normal !important;
          letter-spacing: -0.28px !important;
          color: #010935 !important;
          padding-left: 12px !important;
          padding-top: 10px !important;
        }
`;

export default WithDirection(TextWrapper);