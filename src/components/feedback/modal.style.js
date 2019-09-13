import styled from 'styled-components';


const ModalHolder = styled.div`
  &:before {
        content: var(--image);
          
        font-size: 10px;
        color: inherit;
        line-height: 0;
        position: absolute;
        top: -66px;
        left: calc(50% - 49.5px) ; 
        
        
        }
        &:after{
            content: var(--image_detail);
          
        font-size: 10px;
        color: inherit;
        line-height: 0;
        position: absolute;
        top: calc(-66px + 46.5px - 22px);
        left: calc(50% - 25px) ; 
        
        }
        h1{
        padding-bottom: 30px;
        font-family: Roboto;
          font-size: 26px;
          font-weight: bold;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.19;
          letter-spacing: normal;
          color: #010935;
          }
`;

export default ModalHolder;