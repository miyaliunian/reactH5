/**
 * By Cuiyong 20190708
 * 注册
 */
import React, { Component } from "react";
import Header from "@components/NavBar/NavBar";
import RegisterForm from "@containers/Register/Components/RegisterForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  actions as registerActions,
  getUserName,
  getCellphoneNumber,
  getPassword,
  getPasswordRepeat,
  getSecurityCode,
  getSecurityType,
  getUserIdNumber,
  getSiType,
  getSiMap,
  getLoadStatus
} from "@reduxs/modules/register";
import "./style.less";
import LoadingMask from "@components/Loading/LoadingMask";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";

class RegisterContainer extends Component {
  render() {
    const { siTypes, siMap, loadStatus, r_cellphoneNumber } = this.props;
    return (
      <div className={"register"}>
        <SafeAreaView
          showBar={true}
          title={"用户注册"}
          isRight={false}
          handleBack={this.handleBack}
        >
          <RegisterForm
            onChange={this.handleChange}
            siTypes={siTypes}
            siMap={siMap}
            loadStatus={loadStatus}
            r_cellphoneNumber={r_cellphoneNumber}
            {...this.props}
            // onSubmit={this.checkCellphoneNumber}
            // checkPhone={()=>this.checkCellphoneNumber()}
            // checkPage={this.checkPageParams}
          />
          {loadStatus ? <LoadingMask /> : null}
        </SafeAreaView>
      </div>
    );
  }

  handleChange = e => {
    if (e.target.name === "r_userName") {
      this.props.registerActions.setUserName(e.target.value);
    } else if (e.target.name === "r_userIdNumber") {
      this.props.registerActions.setUserIdNumber(e.target.value);
    } else if (e.target.name === "r_securityType") {
      this.props.registerActions.setSecurityType(e.target.value);
    } else if (e.target.name === "r_cellphoneNumber") {
      this.props.registerActions.setCellphoneNumber(e.target.value);
    } else if (e.target.name === "r_securityCode") {
      this.props.registerActions.setSecurityCode(e.target.value);
    } else if (e.target.name === "r_password") {
      this.props.registerActions.setPassword(e.target.value);
    } else if (e.target.name === "r_passwordRepeat") {
      this.props.registerActions.setPasswordRepeat(e.target.value);
    }
  };

  componentDidMount() {
    // const {doctorInfo, reservationInfo} = this.props.location.state
    // this.props.reservationActions.loadPayType(doctorInfo.hosId, reservationInfo.id)
    // this.props.reservationActions.loadBindCardAndMedicalTypeList()
    this.props.registerActions.getSiType();
  }

  // checkCellphoneNumber(){
  //     this.props.registerActions.checkCellphoneNumber(this.props);
  // }

  checkPageParams = () => {
    this.props.checkPageParams(this.props);
  };

  handleBack = () => {
    // this.props.reservationActions.setIsRefresh(true)
    this.props.history.goBack();
  };
}

const mapStateToProps = state => {
  return {
    r_userName: getUserName(state),
    r_userIdNumber: getUserIdNumber(state),
    r_securityType: getSecurityType(state),
    r_cellphoneNumber: getCellphoneNumber(state),
    r_securityCode: getSecurityCode(state),
    r_password: getPassword(state),
    r_passwordRepeat: getPasswordRepeat(state),
    siTypes: getSiType(state),
    siMap: getSiMap(state),
    loadStatus: getLoadStatus(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerActions: bindActionCreators(registerActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
