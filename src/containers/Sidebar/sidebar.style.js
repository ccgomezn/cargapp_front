import styled from 'styled-components';
import {palette} from 'styled-theme';
import {transition, borderRadius} from '../../settings/style-util';
import WithDirection from '../../settings/withDirection';

const SidebarWrapper = styled.div`

    
      .ant-layout-sider-collapsed{
          .isoLogoWrapper {
          padding-left: 26px !important;
          height: 70px;
          background: white;
          margin: 0;
          padding: 0 10px;
          overflow: hidden;
          ${borderRadius()};
          
          h3 {
            a {
              font-size: 21px;
              font-weight: 300;
              line-height: 70px;
              letter-spacing: 3px;
              text-transform: uppercase;
              color: black;
              display: block;
              text-decoration: none;
            }
          }
        }
      }
      .triggerBtn {
        width: 24px;
        height: 100%;
        display: -webkit-inline-flex;
        display: -ms-inline-flex;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: 0;
        outline: 0;
        position: left;
        cursor: pointer;

        &:before {
          content: '\f20e';
          font-family: 'Ionicons';
          font-size: 26px;
          color: inherit;
          line-height: 0;
          position: absolute;
        }
      }
      
    .ant-menu-inline-collapsed{
        width: 71px !important;
        .ant-menu-submenu {
            .ant-menu-submenu-title {
                padding: 0px 24px !important;
            }
        }
      }
  .isomorphicSidebar {
     width: 71px !important;


    z-index: 1000;
    background-image: radial-gradient(circle at 0px 0px, #010935, #010935);
    width: 280px;
    flex: 0 0 280px;

    
    
    .scrollarea {
      width: 71px !important;
      height: calc(100vh - 70px);
    }

    @media only screen and (max-width: 767px) {
      width: 240px !important;
      flex: 0 0 240px !important;
    }

    &.ant-layout-sider-collapsed {
       min-width: 71px !important;
        max-width: 71px !important;
      @media only screen and (max-width: 767px) {
        width: 0;
        min-width: 0 !important;
        max-width: 0 !important;
        flex: 0 0 0 !important;
      }
    }

    .isoLogoWrapper {
      padding-left: 26px !important;
      height: 70px;
      background: white;
      margin: 0;
      padding: 0 10px;
      overflow: hidden;
      ${borderRadius()};
      
      h3 {
        a {
          font-size: 21px;
          font-weight: 300;
          line-height: 70px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: black;
          display: block;
          text-decoration: none;
        }
      }
    }

    &.ant-layout-sider-collapsed {
      min-width: 76 !important;
      max-width: 76 !important;
      width: 76 !important;

      .isoLogoWrapper {
        padding: 0;
        padding-left: 26px !important;

        h3 {
          a {
            font-size: 27px;
            font-weight: 500;
            letter-spacing: 0;
          }
        }
      }
    }

    .isoDashboardMenu {
      padding-top: 35px;
      padding-bottom: 35px;
      background: transparent;

      a {
        text-decoration: none;
        font-weight: 400;
      }

      .ant-menu-item {
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 26px !important;
        color: white;
        margin: 0;
                background-color: transparent !important;
        a {
                    opacity: 0.8 !important; 

        }
        i {
            opacity: 0.8 !important; 

        }
      }


      .isoMenuHolder {
        display: flex;

        i {
          padding-left: 26px important!;
          font-size: 22px;
          color: white;
          margin: ${props =>
    props['data-rtl'] === 'rtl' ? '0 0 0 20px' : '0 15px 0 0'};
          width: 18.2px;
          ${transition()};
        }
      }

      .anticon {
        font-size: 18px;
        margin-right: 30px;
        color: inherit;
        ${transition()};
      }

      .nav-text {
        padding-left: 10px;
        font-size: 16px;
        opacity: 0.8 !important; 
        color: white !important; 
        font-weight: 400;
        ${transition()};
      }
      
      .ant-menu-item-selected {
                  opacity: 1 !important; 

        i {
            opacity: 1 !important; 

        }
        span {
            opacity: 1 !important; 

        }
        background-color: transparent !important;
        
      }

      > li {
        &:hover {
          
          
        }
      }
    }

    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: ${palette('secondary', 5)};
    }
    .ant-menu-submenu-selected {
        opacity: 1 !important; 
        .ant-menu-item-selected {
            opacity: 1 !important;
        }
        .ant-menu-item {
                            opacity: 0.8; 
        }
    }
    .ant-menu-submenu-inline,
    .ant-menu-submenu-vertical {
        
        .ant-menu-item {
            opacity: 0.8;
            a {
                color: white !important;
                opacity: 0.8 !important; 
                padding-left: 11px !important;
           }
        }
    
      > .ant-menu-submenu-title {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 24px;
        opacity: 0.8; 

        > span {
          display: flex;
          align-items: center;
        }

        .ant-menu-submenu-arrow {
          left: ${props => (props['data-rtl'] === 'rtl' ? '25px' : 'auto')};
          right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '25px')};

          &:before,
          &:after {
            width: 8px;
            ${transition()};
          }

          &:before {
            transform: rotate(-45deg) translateX(3px);
          }

          &:after {
            transform: rotate(45deg) translateX(-3px);
          }

          ${'' /* &:after {
            content: '\f123';
            font-family: 'Ionicons' !important;
            font-size: 16px;
            color: inherit;
            left: ${props => (props['data-rtl'] === 'rtl' ? '16px' : 'auto')};
            right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '16px')};
            ${transition()};
          } */};
        }

        &:hover {
          
          .ant-menu-submenu-arrow {
            &:before,
            &:after {
              color: #ffffff;
            }
          }
        }
      }

      .ant-menu-inline,
      .ant-menu-submenu-vertical {
        .ant-menu
        .nav-text {
          left-padding: 0px !important;
        }

        > li:not(.ant-menu-item-group) {
          padding-left: ${props =>
    props['data-rtl'] === 'rtl' ? '0px !important' : '74px !important'};
          padding-right: ${props =>
    props['data-rtl'] === 'rtl' ? '74px !important' : '0px !important'};
          font-size: 13px;
          font-weight: 400;
          margin: 0;
          color: inherit;
          ${transition()};

          &:hover {
            a {
              color: #ffffff !important;
            }
          }
        }

        .ant-menu-item-group {
          padding-left: 0;

          .ant-menu-item-group-title {
            padding-left: 100px !important;
          }
          .ant-menu-item-group-list {
            .ant-menu-item {
              padding-left: 125px !important;
                      background-color: transparent !important;
            }
          }
        }
      }

      .ant-menu-sub {
        box-shadow: none;
        background-color: transparent !important;
      }
    }

    &.ant-layout-sider-collapsed {
      min-width: 76 !important;
        max-width: 76 !important;
      .nav-text {
        display: none;
      }
      
      .ant-menu-submenu-inline >  {
        .ant-menu-submenu-title:after {
          display: none;
        }
      }

      .ant-menu-submenu-vertical {
        > .ant-menu-submenu-title:after {
          display: none;
        }

        .ant-menu-sub {
          background-color: transparent !important;
        color:white !important;

          .ant-menu-item {
            height: 35px;
          }
        }
      }
    }
  }
`;

export default WithDirection(SidebarWrapper);
