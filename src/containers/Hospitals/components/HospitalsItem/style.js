import styled from "styled-components";
export const PullDownWrapper = styled.div`
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: absolute;
   display: flex;
  justify-content: center;
  align-items: center;
  left: 0px;
  top: 0px;
  z-index: -100;
  > span {
  font-size: 14px;
  }
`;


export const IconWrapper = styled.div`
  display: ${props => (props.isShowLoadingIcon ? "flex" : "none")};
`;