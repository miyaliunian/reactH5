import React, { Component } from "react";
import "./style.less";

export default class CalendarMain extends Component {
  state = {
    week_names: ["日", "一", "二", "三", "四", "五", "六"]
  };

  /**
   * 绑定颜色改变事件
   */
  componentDidMount() {

  }

  render() {
    return (
      <div className="calendar_layout">
        {this.renderWeekHeader()}
        {this.renderWeekBody()}
      </div>
    );
  }

  /**
   * 渲染日历头部
   * @returns {*}
   */
  renderWeekHeader() {
    return (
      <div className="calendar_header" ref="header" style={{ height: 45 }}>
        {this.state.week_names.map((name, index) => {
          return (
            <div className="calendar_header_box" key={index}>
              <div className={"calendar_header_txt"}>{name}</div>
            </div>
          );
        })}
      </div>
    );
  }

  /**
   * 渲染日历内容
   * @returns {*}
   */
  renderWeekBody() {
    //作色的日期
    let fillterMonths = this.props.fillterMonths;
    //确定当前月数据中每一天所属的月份，以此赋予不同className
    let month = this.props.viewData[this.props.month],
      rowsInMonth = [],
      i = 0;
    month.forEach((day, index) => {
      if (index % 7 === 0) {
        /**
         *
         * 数据扁平化,
         * 将原来的对象 新增2个属性，isCur:标识是否为当前日期、isStatus：标识当前日期能否预约
         * data:{
         * day:日期
         *  isCur: 是否为当期日期
         *  isStatus: 是否为可预约
         * }
         * */
        let newMonths = [];
        month.slice(index, index + 7).map(day => {
          let data = {};
          data.day = day; // 日期
          if (new Date().getDate() === day) {
            data.isCur = true; // 当前日期
          } else {
            data.isCur = false; // 当前日期
          }
          if (fillterMonths.includes(day)) {
            data.isStatus = true; // 是否能预约
          } else {
            data.isStatus = false;
          }
          newMonths.push(data);
        });
        rowsInMonth.push(newMonths);
      }

    });
    return (
      <div className={"calendar_body"}>
        {rowsInMonth.map((row, rowIndex) => {
          return (
            <div className={"calendar_body_row"} key={rowIndex}>
              {row.map(day => {
                return (
                  <div
                    className={"calendar_body_box"}
                    onClick={e => this.handleDatePick(e, day)}
                    key={i++}
                  >
                    {this.props.isRender === 0 ? (
                      <div
                        className={
                          day.isCur
                            ? "calendar_body_txt boxCurSel"
                            : day.isStatus
                            ? "calendar_body_txt boxSel"
                            : "calendar_body_txt"
                        }
                      >
                        {day.day}
                      </div>
                    ) : (
                      <div className={"calendar_body_txt"}>{day.day}</div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }

  /**
   *  处理日期点击
   * @param e 虚拟Dom 更改选中的颜色
   * @param data  点击的日期
   */
  handleDatePick(e, day) {
    if (!Array.isArray(day.day)) {
      let previousEl = null;
      previousEl = e.target;
      previousEl.style = "";
      let date = new Date(),
        Y = date.getFullYear() + "-",
        M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-",
        D = day.day < 10 ? "0" + day.day : day.day;
      // console.log(Y + M + day.day)
      e.target.style = "background:#007FFE;color:#000";
      this.props.datePick(Y + M + D);
    }
  }

}
