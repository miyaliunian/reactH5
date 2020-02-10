import React from "react";
import PropTypes from "prop-types";
import NavBar from "@components/NavBar/NavBar";
//样式
import "./DateSelector.less";
import classnames from "classnames";

function Month(props) {
  const {
    staringTimeInMonth,// 代表这个月第一天的零时刻(也就是说 用每个月第一天的0时0分0秒代表这个月)
    onSelect
  } = props;

  //代表当前月0时刻的date对象
  const startDay = new Date(staringTimeInMonth);

  // 获得指定年月的1号是星期几

  return (
    <div>
      <table className={"date-table"}>
        <thead>
        <tr>
          <td colSpan={"7"}>
            <h5>
              {startDay.getFullYear()}年{startDay.getMonth() + 1}月
            </h5>
          </td>
        </tr>
        </thead>
        <tbody>
        <tr className={"data-table-weeks"}>
          <th>日</th>
          <th>一</th>
          <th>二</th>
          <th>三</th>
          <th>四</th>
          <th>五</th>
          <th>六</th>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

Month.prototype = {
  staringTimeInMonth: PropTypes.number.isRequired
};

export default function DateSelector(props) {
  const { show, onBack } = props;

  //当前月的0时0分0秒
  const now = new Date();
  now.setHours(0); //清除小时
  now.setMinutes(0);//清除分钟
  now.setSeconds(0);//清除秒
  now.setMilliseconds(0);//清除毫秒
  now.setDate(1); //将日期重置为1号


  return (
    <div className={classnames("date-selector", { hidden: !show })}>
      <NavBar onBack={onBack} title={"选择出诊日期"} isShowSearchIcon={false}/>
      <div className={"date-selector-tables"}>
        <Month staringTimeInMonth={now.getTime()}/>
      </div>
    </div>
  );
}

DateSelector.prototype = {
  onBack: PropTypes.func
};