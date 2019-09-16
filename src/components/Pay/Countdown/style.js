import styled, {keyframes} from 'styled-components'

export const Container = styled.div`
    display: flex;
    height: 88vh;
    flex-direction: column;
    align-items: center;
    margin-top: 10vh;
`

const spinnerCircleClipper = keyframes`
    0% {
        transform: rotate(0deg);
    }
    99% {
        transform: rotate( 180deg );
        opacity: 1;
    }

    100% {
        transform: rotate(180deg);
        opacity: 0;
    }
`

const spinnerCircle = keyframes`
 0% {
        transform: rotate(-180deg);
    }

    100% {
        transform: rotate(180deg);
    }
`

export const CountDownWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5vh;
    width: 150px;
    height: 150px;
    line-height: 150px;
    border-radius: 50%;
    text-align: center;
    box-shadow: inset 0 0 0 5px rgba(58, 168, 237, .2);
    overflow: hidden;
    >i {
       position: absolute;
       clip: rect(0, 150px, 75px, 0);
       width: 150px;
       height: 150px;
       animation: ${spinnerCircleClipper} 1s ease-in-out infinite;
    }
    &: after {
       position: absolute;
       clip: rect(0, 150px, 150px, 75px);
       width: 150px;
       height: 150px;
       content: '';
       animation: ${spinnerCircle} 1s ease-in-out infinite;
       border-radius: 50%;
       box-shadow: inset 0 0 0 5px #3aa8ed;
    }
     
    .countNum {
       display: block;
       top: 58px;
       right: 74px;
       color: #00b43c;
       font-size:60px
    }
`
