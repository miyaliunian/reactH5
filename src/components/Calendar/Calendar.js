/**
 * Class: 日期选择
 * Author: wufei
 * Date: 2019/6/19
 * Description:
 *
 */
import React, { Component } from "react";
import { getDate } from "@utils/dayutils";
import NavBar from "@components/NavBar/NavBar";
// import CalendarHeader from './CalendarHeader'
// import CalendarMain from './CalendarMain'
//样式
import "./Calendar.less";
import classnames from "classnames";
import { Icon } from "antd-mobile";


const displayDaysPerMonth = year => {
  //定义每个月的天数，如果是闰年第二月改为29天
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    daysInMonth[1] = 29;
  }

  //以下为了获取一年中每一个月在日历选择器上显示的数据，
  //从上个月开始，接着是当月，最后是下个月开头的几天

  //定义一个数组，保存上一个月的天数
  let daysInPreviousMonth = [].concat(daysInMonth);
  daysInPreviousMonth.unshift(daysInPreviousMonth.pop());

  //获取每一个月显示数据中需要补足上个月的天数
  let addDaysFromPreMonth = new Array(12).fill(null).map((item, index) => {
    let day = new Date(year, index, 1).getDay();
    if (day === 0) {
      return 7;
    } else {
      return day;
    }
  });

  //已数组形式返回一年中每个月的显示数据,每个数据为6行*7天
  return new Array(12).fill([]).map((month, monthIndex) => {
    let addDays = addDaysFromPreMonth[monthIndex],
      daysCount = daysInMonth[monthIndex],
      daysCountPrevious = daysInPreviousMonth[monthIndex],
      monthData = [];
    //补足上一个月
    for (; addDays > 0; addDays--) {
      monthData.unshift([]);
    }
    //添入当前月
    for (let i = 0; i < daysCount;) {
      monthData.push(++i);
    }
    //补足下一个月
    monthData.push(new Array(42 - monthData.length).fill(null));
    return monthData;
  });
};

const getMonths = data => {
  let months = [];
  data.map(item => {
    let { oDay } = getDate(item);
    months.push(oDay);
  });
  return months;
};



 class CalendarHeader extends Component {
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


class CalendarMain extends Component {
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
      // e.target.style = "background:#007FFE;color:#000";
      this.props.datePick(Y + M + D);
    }
  }

}



export default class Calendar extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    this.state = {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
      picked: false
    };

    //只有是当前月的时候才显示
    this.isCurrentMonth = 0;
  }

  /*
   * 切换到上一个月
   * */
  prevMonth() {
    this.isCurrentMonth -= 1;
    if (this.state.month === 0) {
      this.setState({
        year: --this.state.year,
        month: 11
      });
    } else {
      this.setState({
        month: --this.state.month
      });
    }
  }

  /**
   * 切换到下一个月
   * */
  nextMonth() {
    this.isCurrentMonth += 1;
    if (this.state.month === 11) {
      this.setState({
        year: ++this.state.year,
        month: 0
      });
    } else {
      this.setState({
        month: ++this.state.month
      });
    }
  }

  //选择日期
  datePick(day) {
    this.setState({ day });
  }

  render() {
    let props = {
      viewData: displayDaysPerMonth(this.state.year),
      fillterMonths: getMonths(this.props.reservations)
    };
    const { show,onBack } = this.props;
    return (
      <div className={classnames("calendar", { hidden: !show })}>
        <NavBar onBack={() => onBack()} title={"选择出诊日期"} isShowSearchIcon={false}/>
        <CalendarHeader
          prevMonth={() => this.prevMonth()}
          nextMonth={() => this.nextMonth()}
          year={this.state.year}
          month={this.state.month}
          day={this.state.day}
        />
        <CalendarMain
          {...props}
          datePick={date => this.props.markDate(date)}
          isRender={this.isCurrentMonth}
          year={this.state.year}
          month={this.state.month}
          day={this.state.day}
        />
      </div>
    );
  }
}
