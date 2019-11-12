/**
 * Class: MedicarePayContainer
 * Author: wufei
 * Date: 2019/8/16
 * Description:
 *  医保支付(结算)
 *
 *    账户支付：siPayAmt + pubPayAmt
 *    账户余额:prePayBalance
 *    待支付：siPayAmt + pubPayAmt
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PopUP from "@components/PopUp/PopUpContainer";
import "./style.less";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import LoadingMask from "@components/Loading/LoadingMask";
//图标
import icon_pay_n from "@images/Pay/icon_pay_radio_n.png";// 支付方式 正常状态
import icon_ybzf from "@images/Pay/ico_ybk_png.png";
import icon_pay_radio_sel from "@images/Pay/icon_pay_radio_sel.png";// 支付方式 选中状态
//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as popUpActions, getPopupState } from "@reduxs/modules/popUp";
import { actions as medicarePayActions, getFetchingStatus, getVerifyEntity } from "@reduxs/modules/medicarePay";


class MedicarePayContainer extends Component {

  //选择哪种支付方式
  state = {
    selIndex: 0
  };

  render() {
    const { orderPayment, ObjEntity, reservationName } = this.props.location.state;
    return (
      <div className={"medicarePay"} style={{ height: "100vh", width: "100%", position: "fixed" }}>
        <SafeAreaView showBar={true} title={"医保支付"} isRight={false} handleBack={this.handleBack}>
          <div className={"payComponent_info"}>
            <div className={"payComponent_info_row"}>
              <span>订单号</span>
              <span>{ObjEntity.sn}</span>
            </div>
            <div className={"payComponent_info_row"}>
              <span>商品名称</span>
              <span>{reservationName}</span>
            </div>
            <div className={"payComponent_info_row"}>
              <span>账户支付</span>
              <span
                style={{ color: "orange" }}>￥{(orderPayment.siPayAmt + orderPayment.pubPayAmt).toFixed(2)}</span>
            </div>
          </div>
          <div style={{ height: "10px", backgroundColor: "rgb(230,230,230)" }}/>
          <div className={"payComponent_payType"}>
            <p style={{ height: "50px", lineHeight: "50px", paddingLeft: "10px" }}>请选择支付方式</p>
            <div className={"payComponent_payBtn_row border-top "}>
              <img src={icon_ybzf} alt='' style={{ width: "40px", height: "40px", paddingRight: "10px" }}/>
              <div className={"payComponent_payBtn_row_right"}>
                <span>医保支付</span>
                <span style={{
                  color: "rgb(126,126,126)",
                  fontSize: "13px",
                  marginTop: "2px"
                }}>账户金额：￥{(orderPayment.prePayBalance.toFixed(2))}</span>
              </div>
              <img src={icon_pay_radio_sel}
                   className={"payComponent_payMethod"}/>
            </div>
          </div>
          <div className={"payComponent_bottomBtn"}>
                        <span
                          className={"payComponent_desc"}
                        >待支付：￥{(orderPayment.siPayAmt + orderPayment.pubPayAmt).toFixed(2)}</span>
            <span className={"payComponent_btn"} onClick={() => this.isLocalOrSiPay()}>支  付</span>
          </div>
          {/*本地电子社保卡 输入密码*/}
          <PopUP price={orderPayment} title={reservationName} callBack={(e) => this.handleInputValues(e,false)}/>
        </SafeAreaView>
        <LoadingMask/>
      </div>
    );
  }


  /*
  支付：判断是本地社保卡 或者 是部里社保卡
   */
  isLocalOrSiPay() {
    //原来的本地
    // popUpActions.showPopup()
    //新增的部里SDK
    const { popUpActions: { showPopup }, medicarePayActions: { loadSignable }, location } = this.props;
    const { person } = location.state;
    // console.log(person)
    //获取渠道支付信息(是本地社保卡 还是部签发社保卡) status: 0 本地社保卡、status: 1 部平台
    loadSignable(person, (i) => {
      if (i.status === 0) {//调用本地电子社保卡
        showPopup();
      } else {
        this.handleInputValues("", true, i.eccsRes);
      }
    });
  }


  handleBack = () => {
    this.props.history.goBack();
  };

  /**
   *  本地电子社保卡 录入密码之后 发起支付流程
   * @param e 本地社保卡填写的密码
   * @param tag  用于标识是本地社保卡 或者为 部签发社保卡(tag为空则为本地社保卡，其余其它情况 都是部社保卡)
   * @param tagData 部平台验证密码之后的返回值
   */
  handleInputValues(e = "", tag = "", tagData = "") {
    debugger
    const { medicarePayActions: { pay } } = this.props;
    const { reservationCode: orderType, ObjEntity, reservationName, orderPayment } = this.props.location.state;
    if (tag) {  // 部平台
      console.log("部平台");
      //密码认证成功，如果是医保支付验证密码，需要拿到busiSeq，传给后台去验证
      if (tagData.actionType === "009") {
        pay("",tag,tagData.busiSeq, orderType, ObjEntity, reservationName, orderPayment, { ...this.props.history }, (data) => this.popGoBack(data));
      }
    } else {  //本地
      console.log("调用本地方法");
      pay(e,tag,"",orderType, ObjEntity, reservationName, orderPayment, { ...this.props.history }, (data) => this.popGoBack(data));
    }
  }


  popGoBack(data) {
    this.props.location.callBack(data);
    setTimeout(() => {
      this.props.history.goBack();
    }, 200);
  }

  componentDidMount() {
    const { history, location, medicarePayActions: { loadVerifyInfo } } = this.props;
    if (history.action === "PUSH") {
      const { person } = location.state;
      loadVerifyInfo(person);
    }
  }


  componentWillUnmount() {
    this.props.popUpActions.hidePopup();
  }
}


const mapStateToProps = (state) => {
  return {
    popupState: getPopupState(state),
    fetchStatus: getFetchingStatus(state),
    verify: getVerifyEntity(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    popUpActions: bindActionCreators(popUpActions, dispatch),
    medicarePayActions: bindActionCreators(medicarePayActions, dispatch)
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicarePayContainer));
