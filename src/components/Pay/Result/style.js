import styled from "styled-components";

export const ContentWrapper = styled.div`
  background-color: white;
  padding: 15px 15px 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img_attr {
    width: 150px;
    height: 150px;
  }
  .img_title {
    text-align: center;
    font-size: 23px;
    color: #0084ff;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const FormWrapper = styled.div`
  width: 100%;
  margin-top: 15px;
  padding-bottom: 5px;
  .form_row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
`;
