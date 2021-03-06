/**
 * Class: RefreshFooter
 * Author: wufei
 * Date: 2019/6/5
 * Description:
 *    底部刷新指示器
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import "./style.less";

export default class RefreshFooter extends Component {
  static propTypes = {
    refreshStatus: PropTypes.bool.isRequired
  };

  render() {
    const { refreshStatus } = this.props;
    return (
      <div className={"refreshFooter"}>
        {refreshStatus ? (
          <div className={"refreshFooter__txt"}>~ 已加载全部数据 ~</div>
        ) : (
          <div className={"refreshFooter__loading"}>
            <ReactLoading
              type={"spokes"}
              width={20}
              height={20}
              color={"#696969"}
            />
            <div className={"refreshFooter__txt"}>正在加载...</div>
          </div>
        )}
      </div>
    );
  }
}
