import styled from 'styled-components'

export const OrderTypeWrapper = styled.div`
    background-color: white;
    padding: 15px;
    box-sizing: border-box;
    .payComponent_info_row {
      display: flex;
      flex-direction: row;
      height: 30px;
      line-height: 30px;
      justify-content: space-between;
    }
`

export const PayTypeList = styled.div`
    background-color: white;
    padding: 15px;
    box-sizing: border-box;
    .payComponent_payBtn_row {
      flex: 1;
      display: flex;
      flex-direction: row;
      height: 40px;
      line-height: 40px;
      align-items: center;
    }
`


export const ButtonWrapper = styled.div`
  position:fixed;
  bottom:0;
  width: 100%;
  height: 45px;
  line-height: 45px;
  display: flex;
  flex-direction: row;
  .payComponent_desc {
  padding-left: 10px;
  width: 65%;
  color: white;
  background-color: rgb(59, 59, 59);
}
.payComponent_btn {
  flex: 1;
  padding-right: 10px;
  color: white;
  text-align: center;
  font-weight: bold;
  background-color: rgb(48, 135, 254);
}
`