import styled from 'styled-components';
import WithDirection from '../../../../settings/withDirection';



const StepsWrapper = styled.div`
.ant-steps-item-finish{
    .ant-steps-item-content{
        .ant-steps-item-title{
            :after{
                background: rgb(0,122,255);;
                background: linear-gradient(270deg, rgba(0,122,255,1) 0%, rgba(0,204,171,1) 100%);
                height: 3px;
                width: 100%;
            }
        }
    }
}

.ant-steps-item {
    .ant-steps-item-content{
        .ant-steps-item-title{
            :after{
                height: 3px;
                width: 100%;
            }
        }
    }
}
`;

export default WithDirection(StepsWrapper);
