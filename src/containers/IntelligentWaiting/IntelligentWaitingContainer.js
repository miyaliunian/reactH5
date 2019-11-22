/**
 * Class:
 * Author: liu-h
 * Date: 2019/6/19
 * Description:
 *   webpack 智能候诊
 */

import React, { Component } from "react";
import Header from "@components/NavBar/NavBar";
import IntelligentWaitingItem from "./components/IntelligentWaitingItem/IntelligentWaitingItem";
import "./style.less";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  actions as bindCardActions,
  getBindCardList,
  getIntelligentWaitingList,
  getFetchingStatus
} from "@reduxs/modules/bindCard";
import BindCardItem from "@components/BindCard/components/BindCardItem/BindCardItem";
import LoadingMask from "../../components/Loading/LoadingMask";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";

const IntelligentWaitingRefreshTime = {
  time: 60000 // 刷新时间一分钟，单位为毫秒
};

class IntelligentWaitingContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bindCardList !== this.props.bindCardList) {
      let perObj = nextProps.bindCardList.filter(item => item.isSel);
      this.props.bindCardActions.loadingWaitingListByPersonId(perObj[0].id);
    }
  }
  handleBack = () => {
    this.props.bindCardActions.resetBindCard();
    this.props.bindCardActions.resetWaitingList();
    this.props.history.goBack();
  };

  render() {
    const { bindCardList, waitingList, fetchingStatus } = this.props;
    return (
      <div
        id="intelligentWaitingContainer"
        onTouchMove={e => this.handleTouchMove(e)}
        className={"intelligentWaitingContainer"}
      >
        <div
          style={{
            position: "fixed",
            top: 0,
            leift: 0,
            right: 0,
            width: "100%",
            zIndex: "999"
          }}
        >
          <Header
            id="intelligentWaitingContainer__header"
            title={"智能候诊"}
            onBack={this.handleBack}
            isRight={false}
          />
          {/*-------------------------选择成员信息*/}
          <BindCardItem
            data={bindCardList}
            isRefresh={this.refresh}
            callBack={data => this.refreshCallBack(data)}
          />
        </div>
        <IntelligentWaitingItem
          data={waitingList}
          fetchingStatus={fetchingStatus}
          pullingDownHandler={() => this.pullingDownHandler()}
        />
        {fetchingStatus ? <LoadingMask /> : null}
      </div>
    );
  }

  // componentDidMount() {
  //   this.props.bindCardActions.loadWaitingList();
  //   // 定时器，可以修改IntelligentWaitingRefreshTime.time为自己想要的时间
  //   this.timer = setInterval(
  //     () => this.timeToRefresh(),
  //     IntelligentWaitingRefreshTime.time
  //   );
  // }
  componentDidMount() {
    const {
      history,
      bindCardActions: { loadList }
    } = this.props;
    if (history.action === "PUSH") {
      loadList();
    }
    // 定时器，可以修改IntelligentWaitingRefreshTime.time为自己想要的时间
    this.timer = setInterval(
      () => this.timeToRefresh(),
      IntelligentWaitingRefreshTime.time
    );
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }
  //下拉刷新
  pullingDownHandler() {
    this.getWaitingListByPersonid();
  }

  //定时执行刷新
  timeToRefresh() {
    this.getWaitingListByPersonid();
  }

  //重新选择家庭成员后重新刷新数据
  refreshCallBack(data) {
    const {
      bindCardActions: { loadingWaitingListByPersonId }
    } = this.props;
    loadingWaitingListByPersonId(data.id);
  }

  getWaitingListByPersonid() {
    this.props.bindCardActions.resetWaitingList();
    const { bindCardList } = this.props;
    bindCardList.map(item => {
      if (item.isSel) {
        this.props.bindCardActions.loadingWaitingListByPersonId(item.id);
      }
    });
  }

  handleTouchMove(event) {}
  //
}

const mapStateToProps = state => {
  return {
    bindCardList: getBindCardList(state),
    waitingList: getIntelligentWaitingList(state),
    fetchingStatus: getFetchingStatus(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    bindCardActions: bindActionCreators(bindCardActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntelligentWaitingContainer);
