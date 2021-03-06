/**
 * Class:  Loading
 * Author: wufei
 * Date: 2019/5/23
 * Description:
 *
 */
import React, { Component } from "react";
import "./style.less";
import ReactLoading from "react-loading";

export default class LoadingMask extends Component {
  componentDidMount() {
    document.getElementById("loadingMask").addEventListener(
      "touchmove",
      event => {
        event.preventDefault();
      },
      {
        passive: false //  禁止 passive 效果
      }
    );
  }

  render() {
    return (
      <div className="loading" id={"loadingMask"}>
        <div className={"loading__contain"}>
          <ReactLoading type={"spinningBubbles"} width={55} height={55} color={'#0084ff'}/>
        </div>
      </div>
    );
  }
}
