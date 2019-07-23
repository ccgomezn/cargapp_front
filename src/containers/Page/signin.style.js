import styled from 'styled-components';
import { palette } from 'styled-theme';
import bgImage from '../../image/sign.jpg';
import WithDirection from '../../settings/withDirection';

const SignInStyleWrapper = styled.div`
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

  .isoLoginContentWrapper {
    width: 700px;
    height: 100%;
    overflow-y: auto;
    z-index: 10;
    position: relative;
  }

  .isoLoginContent {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #ffffff;
    padding-left: 25%;
    padding-right: 25%;
    vertical-align: middle
    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 70px 20px;
    }

    .isoLogoWrapper {
      padding-top: 50%;
      width: 100%;
      display: flex;
      margin-bottom: 50px;
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

    .isoSignInForm {
      width: 100%;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;

      .isoInputWrapper {
        margin-bottom: 15px;
        a {
          color: rgb(178, 186, 200);
          justify-content: flex-end !important;

        }
        &:last-of-type {
          margin-bottom: 0;
        }
        button {
          background-color: rgb(51, 95, 246)
        }
        label {
          color: rgb(178, 186, 200);
          text-transform: uppercase;
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

      .isoHelperText {
        font-size: 12px;
        font-weight: 400;
        line-height: 1.2;
        color: ${palette('grayscale', 1)};
        padding-left: ${props =>
          props['data-rtl'] === 'rtl' ? 'inherit' : '13px'};
        padding-right: ${props =>
          props['data-rtl'] === 'rtl' ? '13px' : 'inherit'};
        margin: 15px 0;
        position: relative;
        display: flex;
        align-items: center;

        &:before {
          content: '*';
          color: ${palette('error', 0)};
          padding-right: 3px;
          font-size: 14px;
          line-height: 1;
          position: absolute;
          top: 2px;
          left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
          right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
        }
      }

      .isoHelperWrapper {
        margin-top: 25px;
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

      .isoOtherLogin {
        padding-top: 40px;
        margin-top: 35px;
        border-top: 1px dashed ${palette('grayscale', 2)};

        > a {
          display: flex;
          margin-bottom: 10px;

          &:last-child {
            margin-bottom: 0;
          }
        }

        button {
          width: 100%;
          height: 42px;
          border: 0;
          font-weight: 500;

          &.btnFacebook {
            background-color: #3b5998;

            &:hover {
              background-color: darken(#3b5998, 5%);
            }
          }

          &.btnGooglePlus {
            background-color: #dd4b39;
            margin-top: 15px;

            &:hover {
              background-color: darken(#dd4b39, 5%);
            }
          }

          &.btnAuthZero {
            background-color: #e14615;
            margin-top: 15px;

            &:hover {
              background-color: darken(#e14615, 5%);
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

      .isoForgotPass {
        font-size: 12px;
        color: ${palette('text', 3)};
        margin-bottom: 10px;
        text-decoration: none;

        &:hover {
          color: ${palette('primary', 0)};
        }
      }

      button {
        font-weight: 500;
      }
    }
  }
`;

export default WithDirection(SignInStyleWrapper);
