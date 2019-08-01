import styled from 'styled-components';
import { palette } from 'styled-theme';
import bgImage from '../../image/work.jpg';
import WithDirection from '../../settings/withDirection';

const SignUpStyleWrapper = styled.div`
[ant-click-animating-without-extra-node]:after {
	animation: 1s !important;
}
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
    width: 526px;
    height: 100%;
       overflow-y: auto;
    z-index: 10;
    position: relative;
  }

  .isoSignUpContent {
    padding-left: 80px;
    padding-right: 80px;

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
      padding-top: 164px;
      width: 100%;
      display: flex;
      margin-bottom: 23px;
      justify-content: start;
      flex-shrink: 0;
      .Bienvenido-a-Cargapp {
        display: inline-block;
        width: 366px;
        height: 38px;
        font-family: Roboto;
        font-size: 32px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.3px;
        color: #010935;
      }
      .Bienvenido-a-Cargapp .text-style-1 {
        color: #0068ff;
        display: inline-block;
      }
      .Una-solucin-digital {
        margin-top: 13px;
        width: 366px;
        height: 21px;
        opacity: 0.5;
        font-family: Roboto;
        font-size: 18px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.3px;
        color: #010935;
      }
    }

    .isoSignUpForm {
      width: 100%;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      
      .footer {
        width: 366px !important;
        position: absolute; 
        bottom: 0px;
        padding-bottom: 24px;
        text-align: center;
        span{
          text-align: center;
        }
        width: 247px;
        height: 14px;
        font-family: Roboto;
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: -0.3px;
        color: #010935;
      }
      .sign-buttons {
        padding-top: 20px;
        hr {
          margin-top: 38px;
          width: 366px;
          height: 1px;
          background-color: #ecf0f1;
          border: 0px solid transparent;
        }
      }
      .button-sign{
        display: inline-box;
      }
      .isoSelectWrapper {
        margin-bottom: 15px;
        animation-duration: 0s !important;
        .ant-radio-button-wrapper {
          animation-duration: 0s !important;
        }
        .ant-radio-button-wrapper-checked {
          animation-duration: 0s !important;

            background-color: #0068ff !important;
            z-index: 0;
            .title {
                color: white !important;
            }
            .subtitle {
                opacity: 0.8 !important;
                color: white !important;
            }
            &:after {

              z-index: 1;
              content:  '';
              position: absolute;
              top: -9px;
              left: 167px;
              width: 20px;
              height: 20px;
              box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.29);
              border: solid 1.2px #0068ff;
              border-radius: 50%;
              background-color: white;
              display: block;
              opacity: 1 !important;
            }
            &:before {
              content: '';
              z-axis: -1;
            position: absolute;
            left: 9px; 
            top: 33px; 
            width: 161px;
            height: 111px;
            opacity: 0.44;
            border-radius: 2px;
            -webkit-filter: blur(10px);
            filter: blur(10px);
            background-color: #0068ff;
            }
        }

        .buttonSelect {
          width: 178px;
          height: 140px;
          border-radius: 8px;
          border: solid 1.2px #ecf0f1;
          background-color: white;
          p {
                          white-space: normal;
              word-wrap: break-word;
          }
          .title {
            font-family: Roboto;
            font-size: 14px;
            font-weight: bold;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.64;
            letter-spacing: -0.2px;
            color: #010935;
            text-align: center;

          }
          .subtitle {
            opacity: 0.5;
            font-family: Roboto;
            font-size: 12px;
            font-weight: normal;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.25;
            letter-spacing: -0.17px;
            text-align: center;
            color: #010935;
          }
        }
      }
      .isoInputWrapper {
        position: relative;

        overflow: hidden;
        
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
      .signupFooter {
          position: absolute;
          bottom: 0px;
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
