import styled from 'styled-components';
import WithDirection from '../../settings/withDirection';

const WDComponentTitleWrapper = styled.div`
h1{
  font-size: 23px;
  font-weight: 300;
  color: black;
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
