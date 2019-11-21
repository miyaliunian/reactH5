/**
 * Class: Title
 * Author: wufei
 * Date: 2019/6/25
 * Description:
 *
 */
import React, { Component } from "react";
import "./style.less";

export default class DoctorTitle extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className={"title__con"}>
        <div className={"title__avatar"}>
          <div>{this.drawAvator(data.name)}</div>
        </div>
        <div className={"title_desc"}>
          <div className={"title__name"}>{data.name}</div>
          <div className={"title__jobTitle___address"}>{data.title}</div>
          <div className={"title__jobTitle___address"}>
            {data.hosName} {data.deptName}
          </div>
        </div>
      </div>
    );
  }

  /**
   * 画头像
   * @param data
   * @returns {*}
   */
  drawAvator(data) {
    let str = data[data.length - 1];
    return <div className={"title__avatar_txt"}>{str}</div>;
  }
}
