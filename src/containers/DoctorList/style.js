import styled from "styled-components";
// height: ${props => (props.isShow ? "60px" : "0px")};
export const ContentWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
`;

export const DateFilterBar = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: ${props => (props.isShow ? "60px" : "0px")};
`;
