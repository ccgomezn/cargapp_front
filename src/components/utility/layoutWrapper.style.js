import styled from "styled-components";

const LayoutContentWrapper = styled.div`
  padding: 29px 16px;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    padding: 50px 20px;
  }

  @media (max-width: 580px) {
    padding: 15px;
  }
  .cardContent {
    label {
      font-family: Roboto;
      font-size: 14px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.64;
      letter-spacing: -0.2px;
      color: rgb(1, 9, 53);
    }
  }
`;

export { LayoutContentWrapper };
