import styled from 'styled-components'

export const ContentWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
`

export const DateFilterBar = styled.div`
  background-color: #00a0dc;  
  height: ${props => props.isShow ? "60px" : "0px"};
`