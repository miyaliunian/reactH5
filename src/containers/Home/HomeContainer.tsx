/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  首容器
 *
 */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { actions as homeActions } from "@reduxs/modules/home";
import { connect } from "react-redux";

import Category from "./components/Category";
import "./style.less";

class Home extends Component {
  render() {
    return (
      <div className={"home"}>
        <Category
          category={(index: number) => {
            this.categoryClick(index);
          }}
        />
      </div>
    );
  }

  categoryClick(index: number) {
    // @ts-ignore
    const { history } = this.props;
    switch (index) {
      case 0:
        history.push("/login");
      case 1:
        history.push("/register");
        break;
      case 2:
        history.push("/hospitals");
        break;
      case 3:
        history.push("/bindCard");
        break;
      case 4:
        history.push("/intelligentWaiting");
        break;
      case 5:
        history.push("/hospitalizationManagement");
        break;
      // case 6:
      //   history.push("/orderReservationDoctor");
      //   break;
      // case 7:
      //   history.push("/payCountdown");
      //   break;
      // case 8:
      //   history.push("/orderContainer");
      //   break;
      case 6:
        history.push("/report");
        break;
      case 10:
        break;
    }
  }
}

const mapStateToProps = (state: any, props: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
