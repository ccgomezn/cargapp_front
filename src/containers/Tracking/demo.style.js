import styled from 'styled-components';
import { palette } from 'styled-theme';

const TableDemoStyle = styled.div`
  .ant-tabs-content {
    margin-top: 40px;
  }

  .filter {
    h1 {
      color: rgba(138,	152,	171	);
      font-size: 15px;
      font-weight: 350;
      text-transform: uppercase;
    }
  }
  .content {
    padding-top: 35px;
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
          color: black;
        }
        input {
          margin-top: 10px;
          border: 1px solid rgba(225, 231, 253	) !important;
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
  }
  .ant-tabs-nav {
    > div {
      color: ${palette('secondary', 2)};

      &.ant-tabs-ink-bar {
        background-color: ${palette('primary', 0)};
      }

      &.ant-tabs-tab-active {
        color: ${palette('primary', 0)};
      }
    }
  }
`;

export default TableDemoStyle;
