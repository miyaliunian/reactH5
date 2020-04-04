import styled from 'styled-components'

export const Wrapper = styled.div `
  overflow: hidden;
  position: fixed;
  top: ${props=>(props.isTop ? '80px' : '40px')};
  left: 0;
  right: 0;
  bottom: 0;
 `