/**
 * Class: HomeHeader
 * Author: wufei
 * Date: 2019/5/23
 * Description:  首页导航条
 *
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.less";

export default class HomeHeader extends Component {
  render() {
    return (
      <div className={"homeHeader"}>
        <header className={"homeHeader__wrapper"}>
          <a className={"homeHeader__city"} href="/">
            沈阳
          </a>
          <Link to="/detail" className={"homeHeader__search"}>
            查询列表
          </Link>
          <Link to="/hospitals" className={"homeHeader__self"}>
            <div className={"homeHeader__portrait"}></div>
          </Link>
        </header>
      </div>
    );
  }
}
