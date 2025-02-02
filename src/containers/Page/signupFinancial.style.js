import styled from 'styled-components';
import { palette } from 'styled-theme';
import bgImage from '../../image/work.jpg';
import WithDirection from '../../settings/withDirection';

const SignUpStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  background: url(${bgImage}) no-repeat center center;
  background-size: cover;

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    z-index: 1;
    top: 0;
    left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
    right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
  }

  .isoSignUpContentWrapper {
    width: 700px;
    height: 100%;
       overflow-y: auto;
    z-index: 10;
    position: relative;
  }

  .isoSignUpContent {
     padding-left: 25%;
    padding-right: 25%;

    min-height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #ffffff;

    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 70px 20px;
    }

     .isoLogoWrapper {
      padding-top: 25%;
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      justify-content: start;
      flex-shrink: 0;

      a {
        font-size: 35px;
        font-weight: 300;
        line-height: 1;
        color: #30384B;
      }
      p {
        font-size: 14px;
        color: rgb(162,173,188);
      }
    }

    .isoLogoWrapper2 {
      width: 100%;
      display: flex;
      margin-bottom: 25px;
      justify-content: start;
      flex-shrink: 0;

      .title {
        font-size: 14px;
        color: rgb(162,173,188);
        text-transform: uppercase;
      }
      .subtitle {
        font-size: 14px;
        color: black;
      }
    }

    .isoSignUpForm {
      width: 100%;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;

      .isoInputWrapper {
        margin-bottom: 15px;

        &:last-child {
          margin-bottom: 0;
        }
        label {
          color: rgb(178, 186, 200);
          text-transform: uppercase;
        }

        .signUp {
          background-color: rgb(50,95,246	)
        }

        button {
          p {
              white-space: normal;
              word-wrap: break-word;
          }
          .title {
                        font-size: 16px;

            color: black;
          }
          .subtitle {
            font-size: 12px;

            color: rgb(138, 152, 171	);
          }
        }
        
        input {
          &::-webkit-input-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &:-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &::-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }
          &:-ms-input-placeholder {
            color: ${palette('grayscale', 0)};
          }
        }
      }

      .isoLeftRightComponent {
        input {
          width: calc(100% - 10px);

          &:first-child {
            margin-right: ${props =>
    props['data-rtl'] === 'rtl' ? 'inherit' : '20px'};
            margin-left: ${props =>
    props['data-rtl'] === 'rtl' ? '20px' : 'inherit'};
          }
        }
      }

      .isoHelperWrapper {
        margin-top: 10px;
        flex-direction: column;
        text-align: center;
        a {
            color: rgb(75, 113, 246);
          }
        p {
          color: rgb(178, 186, 200);
          a {
            color: rgb(75, 113, 246);
          }
        }
      }

      .isoForgotPass {
        font-size: 12px;
        color: ${palette('text', 2)};
        margin-bottom: 10px;

        &:hover {
          color: ${palette('primary', 0)};
        }
      }

      button {
        font-weight: 500;
        width: 100%;
        height: 42px;
        border: 0;

        &.btnFacebook {
          background-color: ${palette('color', 7)};

          &:hover {
            background-color: ${palette('color', 8)};
          }
        }

        &.btnGooglePlus {
          background-color: ${palette('color', 9)};
          margin-top: 15px;

          &:hover {
            background-color: ${palette('color', 10)};
          }
        }

        &.btnAuthZero {
          background-color: ${palette('color', 11)};
          margin-top: 15px;

          &:hover {
            background-color: ${palette('color', 12)};
          }
        }

        &.btnFirebase {
          background-color: ${palette('color', 5)};
          margin-top: 15px;

          &:hover {
            background-color: ${palette('color', 6)};
          }
        }
      }
    }
  }
`;

export default WithDirection(SignUpStyleWrapper);
