import styled from 'styled-components';
import WithDirection from '../../../settings/withDirection';



const SelectWrapper = styled.div`
    .ant-select-search,.ant-select-search--inline{
        margin-left: -12.1px !important;
        input{
            padding-left: 12.1px;
        }
    }
    
    .ant-select {
    
        margin-top: 3px;
    }
    
    select,
    .ant-select-selection,
    input
        {

          width: 100% !important;
          height: 50px !important;
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
          width: 160px !important;
          overflow-wrap: break-word;
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
          font-size: 12px !important;
          font-weight: 500 !important;
          font-style: normal !important;
          font-stretch: normal !important;
          line-height: normal !important;
          letter-spacing: -0.28px !important;
          color: #010935 !important;
          padding-left: 10px !important;
          padding-top: 10px !important;
        }

input: -webkit-autofill {
  background-color: red !important;
}
.ant-select-selection-selected-value, .ant-select-selection__placeholder {
                margin-top: 3px;

  width: 366px !important;
  height: 55px !important;
  padding: 16px 12px 15px 0px !important;
}
.ant-select-selection-selected-value {
  margin-top: -1px;
}


`;

export default WithDirection(SelectWrapper);
