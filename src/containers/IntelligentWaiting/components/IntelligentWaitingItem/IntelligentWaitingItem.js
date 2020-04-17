/**
 * Class:
 * Author: liu-h
 * Date: 2019/6/21
 * Description:
 *
 */
import React, { Component } from "react";
import "./style.less";
import { withRouter } from "react-router-dom";
import { getNoon } from "@utils/dayutils";
import { PullToRefresh, ListView } from "antd-mobile";

const IntelligentWaiting_NoOpenNotice = {
  NOTICE: "智能候诊功能未开通"
};
const IntelligentWaiting_MissedNoNotice = {
  NOTICE: "您的候诊已经结束"
};
const IntelligentWaiting_CurrentNoNotice = {
  NOTICE: "请您立即前往就诊"
};
const IntelligentWaiting_NoStartNotice = {
  NOTICE: "未开始"
};
const IntelligentWaiting_Message = {
  MESSAGE:
    "侯诊信息仅供参考，完成医疗检查后的二次就诊人员医院会进行插号处理，具体以医院现场排号信息为准。"
};

class IntelligentWaitingItem extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      dataSource,
      refreshing: true,
      // isLoading: true,
      down: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: true,
      data: []
    };
  }

  componentDidMount() {
    const newheight = this.state.height - this.lv.offsetTop;
    this.setState({
      height: newheight,
      dataSource: this.state.dataSource.cloneWithRows(this.props.data)
    });
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      if (!this.props.fetchingStatus) {
        this.setState({
          refreshing: false
        });
      }
    }, 200);

    if (nextProps.data !== this.props.data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
      });
    }
  }

  componentDidUpdate() {
    document.body.style.overflow = "hidden";
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.pullingDownHandler();
  };

  //每一行数据
  renderRow(item) {
    return (
      <div className={"intelligentWaitingItemContainer"}>
        <div>
          <div className="intelligentWaitingItem">
            <div className={"intelligentWaitingItem__title border-bottom"}>
              {item.deptName}
            </div>
            <div className="intelligentWaitingItem__middle border-bottom">
              <div className={"intelligentWaitingItem__middleLeft"}>
                就诊医院
              </div>
              <div className={"intelligentWaitingItem__middleRight"}>
                {item.hospitalName}
              </div>
            </div>
            <div className="intelligentWaitingItem__middle border-bottom">
              <div className={"intelligentWaitingItem__middleLeft"}>
                就诊医生
              </div>
              <div className={"intelligentWaitingItem__middleRight"}>
                {item.doctorName}
              </div>
            </div>
            <div className="intelligentWaitingItem__middle border-bottom">
              <div className={"intelligentWaitingItem__middleLeft"}>
                就诊日期
              </div>
              <div className={"intelligentWaitingItem__middleRight"}>
                {item.seenDate} {getNoon(item.noon)}
              </div>
            </div>
            <div>{this.getMiddleData(item)}</div>
            <div>{this.setBtmMessage(item)}</div>
          </div>
        </div>
      </div>
    );
  }

  separator() {
    return (
      <div
        style={{
          backgroundColor: "#F5F5F9",
          height: 10
        }}
      />
    );
  }

  render() {
    return (
      <div>
        <ListView
          key={this.state.useBodyScroll ? "0" : "1"}
          ref={el => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderRow={item => this.renderRow(item)}
          renderSeparator={this.separator}
          useBodyScroll={this.state.useBodyScroll}
          pullToRefresh={
            <PullToRefresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </div>
    );
  }

  pullingDownHandler = () => {
    this.props.pullingDownHandler();
  };

  getMiddleData(item) {
    let noticeStr = "";
    let styleStatus = 0; // 0为提示，1为正常显示等候号码和您的号码
    switch (item.state) {
      case 0:
        noticeStr = IntelligentWaiting_NoOpenNotice.NOTICE;
        styleStatus = 0;
        break;
      case 1:
        noticeStr = IntelligentWaiting_CurrentNoNotice.NOTICE;
        if (item.waitNO === "0") {
          styleStatus = 0;
          noticeStr = IntelligentWaiting_CurrentNoNotice.NOTICE;
        } else if (item.waitNO < 0) {
          styleStatus = 0;
          noticeStr = IntelligentWaiting_MissedNoNotice.NOTICE;
        } else {
          styleStatus = 1;
          noticeStr = "";
        }
        break;
      case 2:
        noticeStr = IntelligentWaiting_NoStartNotice.NOTICE;
        styleStatus = 0;
        break;
      default:
        break;
    }

    if (styleStatus === 0) {
      return this.setNoticeData(noticeStr);
    } else {
      return this.setWaitNoAndSeenNoData(item);
    }
  }

  setWaitNoAndSeenNoData(item) {
    return (
      <div className={"intelligentWaitingItem__middle2 border-bottom"}>
        <div className={"intelligentWaitingItem__middle2__item"}>
          <div className={"intelligentWaitingItem__middle2__title"}>
            前面还有
          </div>
          <div className={"intelligentWaitingItem__middle2__content"}>
            {item.waitNO}
          </div>
        </div>
        <div className={"intelligentWaitingItem__middle2__line"}></div>
        <div className={"intelligentWaitingItem__middle2__item"}>
          <div className={"intelligentWaitingItem__middle2__title"}>
            您的号码
          </div>
          <div className={"intelligentWaitingItem__middle2__content"}>
            {item.yourSeenNo}
          </div>
        </div>
      </div>
    );
  }

  setNoticeData(notice) {
    return (
      <div>
        <div
          className={"intelligentWaitingItem__middle__message border-bottom"}
        >
          {notice}
        </div>
      </div>
    );
  }

  setBtmMessage(item) {
    if (item.hosResponse !== '') {
      return (
        <div>
          <div className={"intelligentWaitingItem__bottom__hosresponse"}>
            {item.hosResponse}
          </div>
          <div className={"intelligentWaitingItem__bottom__defnotice"}>
            {IntelligentWaiting_Message.MESSAGE}
          </div>
        </div>
      );
    } else {
      return (
        <div className={"intelligentWaitingItem__bottom__hosresponse"}>
          {item.hosResponse}
        </div>
      );
    }
  }
}

export default withRouter(IntelligentWaitingItem);
