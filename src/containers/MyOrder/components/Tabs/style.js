import styled from "styled-components";

export const Tab = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #eaeaea;
  background-color:#fff;
  
`

export const TabItem = styled.div`
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    &.current {
      color: #0084ff;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 1px;
        left: 25%;
        height: 2px;
        width: 50%;
        z-index: 100;
        background-color: #0084ff;

      }
    }
    &:first-child {
      border-right: 0.5px solid #eaeaea;
    }
`

export const Wrapper = styled.div`

  overflow: hidden;
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
`
