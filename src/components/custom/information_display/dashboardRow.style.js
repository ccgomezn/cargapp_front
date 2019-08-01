import styled from 'styled-components';
import WithDirection from '../../../settings/withDirection';



const DashboardRowWrapper = styled.div`
.tagDes {
    width: 76.8px;
  height: 26.4px;
  border-radius: 2.4px;
    margin-top: 13%;
       vertical-align: middle;  

    text-align: center;

      i {

      width: 8.4px;
      height: 8.4px;
      display: inline-block;
    }
    h1 {
     vertical-align: middle;  
          padding: 3.6px 0;

      display: inline-block;
      font-family: Roboto;
      font-size: 16.8px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: -0.25px;
    }
  }

`;

export default WithDirection(DashboardRowWrapper);