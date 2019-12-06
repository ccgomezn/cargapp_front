import styled from 'styled-components';
import { palette } from 'styled-theme';

const WidgetWrapper = styled.div`
  
  margin: 0 10px;
  height: 100% !important;
  @media only screen and (max-width: 767) {
    margin-right: 0 !important;
  }


  .isoReportsWidget {
    padding-top: 11px !important;
    padding-right: 20px !important;
    padding-bottom: 15px !important;
    padding-left: 17px !important;
  }
  .isoWidgetLabel {
    padding-bottom: 11px;
    vertical-align: center;
    span{
      font-family: Roboto;
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.64;
    letter-spacing: -0.2px;
    color: #0088f1;
    text-transform: uppercase;
    }
    
    span:after {
    content: ""; 
    display: block; 
    margin: 0 auto; 
    width: 60px; 
    position: absolute;
    padding-top: 12px; /* This creates some space between the element and the border. */
    border-bottom: 2px solid transparent !important;
            background-image: radial-gradient(circle at 236% 0, #007aff, #00ccab) !important;
            background-size: 60px 2px !important; /* 4px extra to cater for 2px border on right + 2px on left */
            background-repeat: no-repeat !important;
            background-origin: border-box !important; /* make background start from border area itself instead of content/padding area */
            background-position: bottom left !important;
            box-sizing: border-box !important !important;
  
}
    
  }

  .titleDataReport {
    h1 {
     font-family: Roboto;
  font-size: 22px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.18;
  letter-spacing: -0.55px;
  color: #010935;
}
    

    h2 {
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
  


  .vehiclesOnTrack {
    h3 {
      font-size: 13px;
      font-weight: 400;
      color: rgba(140,	154,	173	);
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
