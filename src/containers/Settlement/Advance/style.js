import styled from "styled-components";

export const SettleInfoContent = styled.div`
  background-color: white;
  padding: 10px;
`;

export const Separation = styled.div`
  background-color: rgb(239, 238, 239);
  height: 10px;
`;
export const InfoRow = styled.div`
  height: 40px;
  line-height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  border-bottom: ${props =>
    props.showBorder ? "1px solid #f1f1f1" : "0px solid #f1f1f1"};
  .infoRow_item_title {
    padding-left: 10px;
    width: 20%;
  }
  .infoRow_item_middle {
    width: 40%;
    flex-direction: row;
  }
  .infoRow_item_right {
    flex: 1;
    padding-right: 10px;
    flex-direction: row;
  }
`;
export const PayStatusContent = styled.div`
    background-color:rgb(239,238,239);
    padding: 0 10px;
    display:flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #f1f1f1;
    display:${props => (props.show ? "flex" : "none")}
    .hospitalsItem__middle__icon {
      width: 24px;
      height: 24px;  
      margin-right: 4px;
      border-radius: 12px;
      overflow: hidden;
    }
`;

export const PerContent = styled.div`
  line-height: 50px;
  background-color: rgb(249, 249, 249);
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #f1f1f1;
`;

export const PayInfoContent = styled.div`
  background-color: white;
`;

export const BtnContent = styled.div`
  position: fixed;
  bottom: 30px;
  z-index: 100;
  left: 5%;
  width: 90%;
  height: 50px;
  line-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
