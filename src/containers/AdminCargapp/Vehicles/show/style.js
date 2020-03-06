import styled from 'styled-components';

const TitleLabel = styled.label`
  font-size: 18px !important;
  display: flex !important;
  align-items: start !important;
  justify-content: start !important;
  color: #0168ff !important;
  font-weight: 500 !important;
  width: auto !important;
`;

const TitleDivider = styled.div`
  background: rgb(0,122,255);
  background: linear-gradient(270deg, rgba(0,122,255,1) 0%, rgba(0,204,171,1) 100%);
  height: 2px;
  width: 100px;
  margin-top: -10px;
  margin-bottom: 20px;
`;

const SliderContainer = styled.div`
  div {
    border-radius: 5px;
  }
`;

const TextItemStyle = { lineHeight: 1, 
  marginBottom: '5%',
};



export {
  TitleLabel,
  TitleDivider,
  SliderContainer,
  TextItemStyle
}
