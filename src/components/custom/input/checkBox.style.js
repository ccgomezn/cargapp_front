import styled from 'styled-components';
import WithDirection from '../../../settings/withDirection';



const CheckboxWrapper = styled.div`

.ant-checkbox-inner{
  width: 22px;
  height: 22px;
  border-radius: 3px;
  background-color: #DBECFF;
  border: 1px solid #000;
  display: block;
  color: blue;
}

.ant-checkbox-inner::after {
  top: 25%;
  left: 40%;
}

label {
  width: 100% !important;
  transition: // not padding
    background 0.2s,
    color 0.2s,
    top 0.2s,
    bottom 0.2s,
    right 0.2s,
    left 0.2s !important;
  opacity: 0.5 !important;
  font-family: Roboto !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  font-style: normal !important;
  color: #010935 !important;
  padding-left: 12px !important;
}

text {
  margin-top: 35px !important;
  margin-bottom: -10px !important;
  display: block;
  opacity: 0.5 !important;
  font-family: Roboto !important;
  font-size: 14px !important;
  font-weight: bold !important;
  font-style: normal !important;
  color: #010935 !important;
  padding-left: 12px !important;
}

`;

export default WithDirection(CheckboxWrapper);
