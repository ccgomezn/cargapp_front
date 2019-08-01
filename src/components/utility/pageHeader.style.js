import styled from 'styled-components';
import WithDirection from '../../settings/withDirection';

const WDComponentTitleWrapper = styled.div`
h1{
  font-family: Roboto;
  font-size: 32px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.3px;
  color: rgb(1, 9, 53);
  width: 100%;
  margin-right: 17px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    margin: 0 10px;
    margin-bottom: 30px;
  }


  h2 {
  padding-left: 35px;
  font-size: 18px;
  font-weight: 300;
  color: rgba(138,152,171	);
  width: 100%;
  margin-right: 17px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    margin: 0 10px;
    margin-bottom: 30px;
  }
}


}

  
`;



const ComponentTitleWrapper = WithDirection(WDComponentTitleWrapper);
export { ComponentTitleWrapper };
