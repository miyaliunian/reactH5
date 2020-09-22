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
import BindCardItem from "@components/BindCard/components/BindCardItem/BindCardItem";
import LoadingMask from "../../components/Loading/LoadingMask";
//Redux

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    actions as bindCardActions,
    getBindCardList
} from "@reduxs/modules/bindCard";
import {
  actions as waitingActions,
  // getBindCardList,
  getIntelligentWaitingList,
  getFetchingStatus
} from "@reduxs/modules/intelligentWaiting";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";

const IntelligentWaitingRefreshTime = {
  time: 60000 // 刷新时间一分钟，单位为毫秒
};

class IntelligentWaitingContainer extends Component {
  state={
    index:0
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.bindCardList !== this.props.bindCardList) {
      let perObj = nextProps.bindCardList.filter(item => item.isSel);
      this.props.waitingActions.loadingWaitingListByPerson(perObj[0]);
    }
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { bindCardList, waitingList, fetchingStatus } = this.props;
    return (
      <SafeAreaView showBar={true} title={"智能候诊"} isRight={false} handleBack={this.handleBack}>
        <div className={"intelligentWaitingContainer"}>
          <BindCardItem data={bindCardList} isRefresh={this.refresh} callBack={this.refreshCallBack}/>
          <IntelligentWaitingItem
            data={waitingList}
            fetchingStatus={fetchingStatus}
            pullingDownHandler={() => this.pullingDownHandler()}
          />
          <LoadingMask/>
        </div>
      </SafeAreaView>
    );
  }

  componentDidMount() {
    this.setState({
      index:this.state.index+=1
    })
    const {
      history,
      bindCardActions: { loadList }
    } = this.props;
    if (history.action === "PUSH") {
      // loadList();
      // 定时器，可以修改IntelligentWaitingRefreshTime.time为自己想要的时间
      // this.timer = setInterval(() => this.timeToRefresh(), IntelligentWaitingRefreshTime.time);
    }
    loadList();
    this.timer = setInterval(() => this.timeToRefresh(), IntelligentWaitingRefreshTime.time);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  //下拉刷新
  pullingDownHandler() {
    this.getWaitingListByPerson();
  }

  //定时执行刷新
  timeToRefresh() {
    this.getWaitingListByPerson();
  }

  //重新选择家庭成员后重新刷新数据
  refreshCallBack =(data)=>{
    const {
      waitingActions: { loadingWaitingListByPerson }
    } = this.props;
    loadingWaitingListByPerson(data);
  }

  getWaitingListByPerson() {
    const { bindCardList,waitingActions:{resetWaitingList,loadingWaitingListByPerson} } = this.props;
    resetWaitingList()
    setTimeout(()=>{
      bindCardList.map(item => {
        if (item.isSel) {
          loadingWaitingListByPerson(item);
        }
      });
    },300)
  }

  handleTouchMove(event) {
  }

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
      bindCardActions: bindActionCreators(bindCardActions, dispatch),
      waitingActions: bindActionCreators(waitingActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntelligentWaitingContainer);
