import styled from 'styled-components';
import { palette } from 'styled-theme';
import bgImage from '../../image/sign.jpg';
import bgFormImage from '../../image/signin-form-bg.jpg';
import WithDirection from '../../settings/withDirection';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto:300,400', 'sans-serif']
  }
});

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

  @media only screen and (max-width: 1700px) {
    .loginTitle {
      width: 65% !important;
    }
    .loginTitle h1 {
      font-size: 2.5rem !important;
      width: 250px;
    }
    .isoLoginContentWrapper {
      width: 30% !important;
    }
  }
  @media only screen and (max-width: 1400px) {
    .loginTitle {
      width: 63% !important;
    }
    .loginTitle h1 {
      font-size: 2.3rem !important;
      width: 250px !important;
    }
    .isoLoginContentWrapper {
      width: 35% !important;
    }
  }
  @media only screen and (max-width: 1200px) {
    .loginTitle h1 {
      font-size: 2rem !important;
      width: 250px !important;
    }
    .isoLoginContentWrapper {
      width: 40% !important;
    }
  }
  @media only screen and (max-width: 1030px) {
    .loginTitle h1 {
      display: none;
    }
    .isoLoginContentWrapper {
      width: 40% !important;
    }
  }
  @media only screen and (max-width: 780px) {
    display: block;

    .loginTitle h1 {
      display: none;
    }
    .isoLoginContentWrapper {
      width: 100% !important;
    }
  }

  .loginTitle {
    width: 60%;
    text-align: right;
  }
  .loginTitle h1{
    color: #FFF;
    font-weight: 300 !important;
    font-size: 3rem;
    width: 300px;
    text-align: left;
    float: right;
    line-height: 1.25;
  }

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    z-index: 1;
    top: 0;
    left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
    right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
    background-color: rgba(0,0,0,0.1);
  }

  .isoLoginContentWrapper {
    width: 30%;
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
    padding-left: 15%;
    padding-right: 15%;
    vertical-align: middle;
    background: url(${bgFormImage}) no-repeat center center !important;
    background-size: cover !important;

    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 70px 20px;
    }
    .footer {
      width: 70% !important;
      text-align: center;
      span{
        text-align: center;
      }
      width: 50%;
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
        width: 100%;
        text-align: center;
      }
      .Bienvenido-a-Cargapp img{
        width: 65%;
        text-align: center;
      }
      .Bienvenido-a-Cargapp .text-style-1 {
        color: #0068ff;
        display: inline-block;
      }
      .Una-solucin-digital {
        text-align: center;
        margin-top: 20px;
        margin-left: -5px;
        margin-bottom: 15%;
        width: 100%;
        height: 21px;
        opacity: 0.5;
        font-family: Roboto;
        font-size: 0.95rem;
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
        .button-sign{
          display: inline-block;
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
        background-color: #FFF;
        overflow: hidden;
        
        a {
          color: rgb(178, 186, 200);
          justify-content: flex-end !important;

        }
        &:last-of-type {
          margin-bottom: 0;
        }
        button {
          background-color: rgb(51, 95, 246);
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
