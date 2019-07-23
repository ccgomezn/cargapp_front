import styled from 'styled-components';
import { palette } from 'styled-theme';

const WidgetWrapper = styled.div`
  margin: 0 10px;
  height: 100% !important;
  @media only screen and (max-width: 767) {
    margin-right: 0 !important;
  }

  .titleReport {
    h1 {
      font-size: 25px;
    font-weight: 350;
    }

    h2 {
      font-size: 17px;
    font-weight: 300;
      color: rgba(140,	154,	173	)
    }
  }

  .vehiclesOnTrack {
    h3 {
      font-size: 13px;
      font-weight: 400;
      color: rgba(140,	154,	173	);
      text-transform: uppercase;
    }
    .data {
      h4 {
      display: inline;
      font-size: 40px;
      font-weight: 300;
      color: black;
    }

    h5 {
      display: inline;
      font-size: 20px;
      font-weight: 250;
      color: black;
    }
  }
    
}
`;

const WidgetBox = styled.div`
  width: 100%;
  height: ${props => (props.height ? `${props.height}px` : '100%')};
  padding: ${props => (props.padding ? props.padding : '30px')};
  background-color: #ffffff;
  border: 1px solid ${palette('border', 2)};

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

const WidgetColumn = styled.div`
  align-content: flex-start;
`;

export { WidgetWrapper, WidgetBox, WidgetColumn };
