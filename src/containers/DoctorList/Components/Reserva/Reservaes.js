/**
 * Class: Reservaes
 * Author: wufei
 * Date: 2019/6/20
 * Description:
 *  医生列表->按照日期选择->日期
 */
import React, { Component } from "react";
import { getDate } from "@utils/dayutils";

import "./style.less";

const getMonths = data => {
  let months = [];
  data.map((item, index) => {
    let { oMonth, oDay, oweekDay } = getDate(item);

    let Obj = { oMonth, oDay, oweekDay };
    index === 0 ? Obj.isSel = true : Obj.isSel = false;
    months.push(Obj);
  });
  return months;
};

export default class Reservaes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: []
    };
  }

  render() {
    const { filterMore } = this.props;
    return (
      <div className={"reservaes-content"}>
        {this.state.days.map((day, index) => {
          let cls = "reservaes-box";
          if (day.isSel) {
            cls += " reservaes-box active";
          }
          return (
            <div
              key={index}
              className={cls}
              onClick={() => this.boxClick(day,index)}
            >
              <div>{day.oweekDay}</div>
              <div style={{fontSize:"11px"}}>{day.oMonth + "-" + day.oDay}</div>
            </div>
          );
        })}
        {filterMore.length > 0 ? (
          <div className={"reservaes-more"} onClick={this.props.showModal}>
            {filterMore}
          </div>
        ) : (
          <div className={"reservaes-more"} onClick={this.props.showModal}>
            更多 >>
          </div>
        )}
      </div>
    );
  }

  componentWillReceiveProps(nextPros) {
    if (
      nextPros.reservations &&
      nextPros.reservations.length > 0 &&
      this.state.days.length === 0
    ) {
      let days = getMonths(nextPros.reservations);

      this.setState({
        days: days
      });
    }
  }

  shouldComponentUpdate() {
    return true;
  }


  /**
   * 更新数据状态
   * @param dayObj
   */
  boxClick(dayObj,index) {
    const { reservations,doFilter } = this.props;
    let days = getMonths(reservations);
    days.map(item => {
      if (item.oDay === dayObj.oDay) {
        item.isSel = true;
      } else {
        item.isSel = false;
      }
    });

    this.setState({
      days: days
    });
    doFilter(reservations[index])
  }
}
