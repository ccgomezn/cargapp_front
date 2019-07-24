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
    width: 526px;
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
    padding-left: 80px;
    padding-right: 80px;
    vertical-align: middle
    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 70px 20px;
    }
    .footer {
              width: 366px !important;

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
      position: absolute; 
        bottom: 0px;
        padding-bottom: 24px;
    }
    .isoLogoWrapper {
      padding-top: 164px;
      width: 100%;
      display: flex;
      margin-bottom: 18px;
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

    .isoSignInForm {
      width: 100%;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;

      .sign-buttons {
        padding-top: 35px;
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
          width: 130px;
          height: 45px;
          border-radius: 2px;
          border: 0px solid transparent;
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


      .helper {
          padding-top: 17px;
          a {
            font-family: Roboto;
            font-size: 12px;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            line-height: normal;
            letter-spacing: -0.3px;
            color: #0068ff;
            text-align: right;
          }
          .ant-checkbox-checked{
            .ant-checkbox-inner{
              border-radius: 2px !important;
                border: solid 1.2px #0068ff !important;
                background-color: var(--white) !important;
                :after{
                  transform: rotate(45deg) scale(1);
                  
                  position: absolute;
                  display: table;
                  border: solid 1.5px #0068ff;
                  border-top: 0;
                  border-left: 0;
                  content: ' ';
                  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
                  opacity: 1;
                }
            }
          }
          .check{
            checkbox {
              width: 17px;
              height: 17px;
              
            }
            span {
                    
              font-family: Roboto;
              font-size: 12px;
              font-weight: normal;
              font-style: normal;
              font-stretch: normal;
              line-height: normal;
              letter-spacing: -0.3px;
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
        
          
        input, textarea {
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
        margin-top: 38px;
        width: 366px;
        height: 82px;
        border-radius: 10px;
        background-image: radial-gradient(circle at 0 0, #ff2557, #320d8e);
        z-index: 1;
          :after {
            content: '';
            position: absolute;
            left: 93.5px; 
            top: 603px; 
            z-index: -1;
            width: 340px;
            height: 42px;
            opacity: 0.44;
            border-radius: 2px;
            -webkit-filter: blur(10px);
            filter: blur(10px);
            background-image: radial-gradient(circle at 0 0, #ff2557, #320d8e);
          }
       .isoHelperLogo {
          width: 64px;
          height: 64px;
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.2);
          margin: 9px 13px 9px 9px;
       }
       .title1 {
         padding-top: 11px;
         font-family: Roboto;
        font-size: 16px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.44;
        letter-spacing: -0.23px;
        color: white;
       }
       .title2 {
         opacity: 0.8;
        font-family: Roboto;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.29;
        letter-spacing: -0.2px;
        color: white;
        
       }
       .text-style-1 {
         opacity: 0.8;
          font-family: Roboto;
          font-size: 14px;
          font-weight: normal;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.29;
          letter-spacing: -0.2px;
          color: white;
          font-weight: 500;
          text-decoration: underline;
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
