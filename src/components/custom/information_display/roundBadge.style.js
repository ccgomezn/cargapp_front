import styled from 'styled-components';
import WithDirection from '../../../settings/withDirection';



const RoundBadgeWrapper = styled.div`
.ant-tag {
  width: 102px;
  height: 30px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  text-align: center;

  .content {
    margin-left: auto;
    margin-right: auto;
  }
}
`;

export default WithDirection(RoundBadgeWrapper);