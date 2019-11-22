/**
 * Class: OrderMedicarePayContainer
 * Author: wufei
 * Date: 2019-10-22
 * Description:
 *  从订单查询-进入 纯自费
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  actions as orderPayActions,
  getOrderType
} from "../../reduxs/modules/orderPay";

class orderThirdPayContainer extends Component {
  render() {
    return <div />;
  }

  componentDidMount() {
    const {
      history,
      orderPayActions: { setOrderPayType }
    } = this.props;
    setTimeout(() => {
      //混合支付
      window["J2C"].payReg("去支付", function(e) {});
      window["J2C"]["payRegCallBack"] = function(response) {
        let resObj = JSON.parse(response);
        //从哪个页面进入(预约挂号、门诊缴费、扫描购药)
        setOrderPayType(resObj.fromTarget);

        let typeEntity = {};
        switch (resObj.fromTarget) {
          case "register":
            typeEntity = { orderName: "线上挂号", orderCode: "register" };
            break;
          case "recipe":
            typeEntity = { orderName: "门诊缴费", orderCode: "recipe" };
            break;
          case "medicineScan":
            typeEntity = { orderName: "扫码购药", orderCode: "medicineScan" };
            break;
          default:
            break
        }

        //跳转页面
        let token = {},
          reservationEntity = resObj.reservationEntity;
        token.access_token = resObj.access_token;
        token.refresh_token = resObj.refresh_token;
        let orderPaymentEntity = JSON.parse(
          JSON.stringify(reservationEntity)
            .replace(/ownCost/g, "ownPayAmt")
            .replace(/regFee/g, "totalPayAmt")
        );
        sessionStorage.setItem("token", JSON.stringify(token));

        let path = {
          pathname: "/thirdPayContainer",
          state: {
            orderPayment: orderPaymentEntity, //拼接订单信息
            reservationName: typeEntity.orderName,
            reservationCode: typeEntity.orderCode,
            ObjEntity: reservationEntity,
            paymentMethod: reservationEntity.paymentMethod,
            from: resObj.fromTarget
          }
        };
        history.push(path);
      };
    }, 100);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }


}

const mapStateToProps = state => {
  return {
    payType: getOrderType(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderPayActions: bindActionCreators(orderPayActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(orderThirdPayContainer));
