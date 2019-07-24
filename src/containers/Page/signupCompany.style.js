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
      padding-top: 142px;
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
    .isoLogoWrapper2 {
      margin-top: 15px;
      hr {
        width: 366px;
        height: 1px;
        background-color: #ecf0f1;
        border 0px solid transparent;
      }

      .title {
        margin-top: 15px;
        font-family: Roboto;
      font-size: 16px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.44;
      letter-spacing: -0.23px;
      color: #0168ff;
      }

      .subtitle{
        margin-top: 15px;
        opacity: 0.5;
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.36;
        letter-spacing: -0.2px;
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
        .register {
          margin-right: 10px;
         width: 130px;
          height: 45px;
          border-radius: 2px;
          border: solid 1.2px #0068ff;
          background-color: var(--white);
          font-family: Roboto;
          font-size: 14px;
          font-weight: 500;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: -0.35px;
          color: #0068ff;
        }
        
        .sign-in {
          
          border: 0px solid transparent;
          width: 130px;
          height: 45px;
          border-radius: 2px;
          background-image: radial-gradient(circle at 10% 12%, #007aff, #00ff77);
          font-family: Roboto;
          font-size: 14px;
          font-weight: 500;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: -0.35px;
          text-align: center;
          color: white;
          z-index: 2;
          :after {
            content: '';
            position: absolute;
            left: 9px; 
            top: 13px; 
            width: 112px;
            z-index: -1;
            height: 39px;
            opacity: 0.44;
            border-radius: 2px;
            -webkit-filter: blur(10px);
            filter: blur(10px);
            background-image: radial-gradient(circle at 12% 15%, #007aff, #00ff77);
          }
        }
      }

      .isoSelectWrapper {
        margin-bottom: 15px;
        animation-duration: 0s !important;

        .ant-radio-button-wrapper-checked {

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
        select,
        .ant-select-selection,
        input
        {
          
          width: 366px;
          height: 55px;
          border-radius: 2px;
          border: solid 1.2px #ecf0f1;
          background-color: var(--white) !important;
          font-family: Roboto;
          font-size: 14px;
          font-weight: normal;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: -0.35px;
          color: #010935;
          :focus {
            border-left: 2px solid transparent;
            background-image: radial-gradient(circle at 236% 0, #ff2557, #320d8e);
            background-size: 2px calc(100% + 4px); /* 4px extra to cater for 2px border on right + 2px on left */
            background-repeat: no-repeat;
            background-origin: border-box; /* make background start from border area itself instead of content/padding area */
            background-position: bottom left;
            box-sizing: border-box !important;
  
          }
          
        }
        
        input:-webkit-autofill {
            background-color: red !important;
        }
        
         .ant-select-selection-selected-value, .ant-select-selection__placeholder {
           width: 366px;
            height:55px;
          padding: 16px 12px 13px 0px; 
         }
        input, textarea {
              width: 366px;
            height:55px;
          padding: 26px 12px 13px 10px; 
        }

        
        
        
        label {
          transition: // not padding
            background 0.2s,
            color 0.2s,
            top 0.2s,
            bottom 0.2s,
            right 0.2s,
            left 0.2s;
          position: absolute;
          opacity: 0.5;
          font-family: Roboto;
          font-size: 11px;
          font-weight: 500;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: -0.28px;
          color: #010935;
          padding-left: 12px;
          padding-top: 10px;
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
