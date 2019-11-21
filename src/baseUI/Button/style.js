import styled from "styled-components";

export const BtnWrapper = styled.div`
  text-align: center;
  width: 100%;
  .form__btn {
    width: 100%;
    height: 45px;
    line-height: 45px;
    color: #fff;
    text-decoration: none;
    background: ${props => (props.disabled ? "#CCCCCC" : "#0084ff")};
    border: none;
    border-radius: 4px;
    font-size: 16px;
    letter-spacing: 5px;
  }
`;
