import React, { Component } from "react";
import "./style.less";
import { withRouter } from "react-router-dom";
import { getNoon } from "@utils/dayutils";
import { PullToRefresh, ListView, Icon } from "antd-mobile";

class ReportItem extends Component {
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
      <div className={"reportItem"}>
        <ul>
          <li
            key={item.id}
            className={"reportItem__item border-bottom"}
            onClick={() => this.handelPageNav(item)}
          >
            <div className={"reportItem__item__info"}>
              <div className={"item__info__row"}>
                <span className={"row_info_title"}>{item.licName}</span>
              </div>
              <div className={"item__info__row"}>
                <span className={"row_info_title"}>
                  {item.appliyDept +
                    (item.sampleFlag != "" ? "  |  " + item.sampleFlag : "")}
                </span>
                <Icon
                  className={"clinic__bar__icon"}
                  style={{ position: "absolute", right: 5 }}
                  type={"right"}
                />
              </div>
              <div className={"item__info__row"}>
                <span className={"row_info_title"}>
                  {item.sampleDate != "" ? item.sampleDate : ""}
                </span>
                <span className={"row_info_detail"}>
                  {item.lisState === "已出" ? "(报告已出)" : "(报告未出)"}
                </span>
              </div>
            </div>
          </li>
        </ul>
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

  /**
   * 跳转页面:
   * @param data
   */
  handelPageNav(data) {
    console.log(data);
    let path = {
      pathname: "/reportDetail",
      state: data
    };
    this.props.history.push(path);
  }
}

export default withRouter(ReportItem);
