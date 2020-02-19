import styled from 'styled-components';

const TitleLabel = styled.label`
  font-size: 18px !important;
  display: flex !important;
  align-items: start !important;
  justify-content: start !important;
  color: #0168ff !important;
  font-weight: 500 !important;
`;

const TitleDivider = styled.div`
  background: rgb(0,122,255);
  background: linear-gradient(270deg, rgba(0,122,255,1) 0%, rgba(0,204,171,1) 100%);
  height: 2px;
  width: 110px;
  margin-top: -10px;
  margin-bottom: 20px;
`;



export {
  TitleLabel,
  TitleDivider,
}
