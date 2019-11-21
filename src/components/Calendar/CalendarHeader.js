import React, { Component } from "react";
import { Icon } from "antd-mobile";
import "./style.less";

export default class CalendarHeader extends Component {
  render() {
    return (
      <div className="calendarHeader">
        <div className="prev" onClick={this.props.prevMonth}>
          <Icon type="left" />
        </div>
        <span className="dateInfo">
          {" "}
          {this.props.year}年{this.props.month + 1}月{" "}
        </span>
        <div className="next" onClick={this.props.nextMonth}>
          <Icon type="right" />
        </div>
      </div>
    );
  }
}
