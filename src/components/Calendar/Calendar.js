/**
 * Class: Calendar
 * Author: wufei
 * Date: 2019/6/19
 * Description:
 *
 */
import React, {Component} from 'react';
import CalendarHeader from './CalendarHeader'
import CalendarMain from './CalendarMain'
import './style.less'
import {getDate} from "@utils/dayutils";

const displayDaysPerMonth = (year) => {
    //定义每个月的天数，如果是闰年第二月改为29天
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29
    }

    //以下为了获取一年中每一个月在日历选择器上显示的数据，
    //从上个月开始，接着是当月，最后是下个月开头的几天

    //定义一个数组，保存上一个月的天数
    let daysInPreviousMonth = [].concat(daysInMonth)
    daysInPreviousMonth.unshift(daysInPreviousMonth.pop())

    //获取每一个月显示数据中需要补足上个月的天数
    let addDaysFromPreMonth = new Array(12)
        .fill(null)
        .map((item, index) => {
            let day = new Date(year, index, 1).getDay()
            if (day === 0) {
                return 7
            } else {
                return day
            }
        })

    //已数组形式返回一年中每个月的显示数据,每个数据为6行*7天
    return new Array(12)
        .fill([])
        .map((month, monthIndex) => {
            let addDays = addDaysFromPreMonth[monthIndex],
                daysCount = daysInMonth[monthIndex],
                daysCountPrevious = daysInPreviousMonth[monthIndex],
                monthData = []
            //补足上一个月
            for (; addDays > 0; addDays--) {
                // monthData.unshift(daysCountPrevious--)
                monthData.unshift([])

            }
            //添入当前月
            for (let i = 0; i < daysCount;) {
                monthData.push(++i)
            }

            //补足下一个月
            monthData.push(new Array(42 - monthData.length).fill(null))

            // for (let i = 42 - monthData.length, j = 0; j < i;) {
            //     monthData.push(++j)
            //     // monthData.push([])
            // }


            return monthData
        })
}

const getMonths = (data) => {
    let months = []
    data.map((item) => {
        let {oDay, cDay} = getDate(item)
        months.push(oDay)
    })
    return months
}

export default class Calendar extends Component {

    constructor(props) {
        super(props)
        let now = new Date()
        this.state = {
            year: now.getFullYear(),
            month: now.getMonth(),
            day: now.getDate(),
            picked: false
        }
    }

    /*
    * 切换到上一个月
    * */
    prevMonth() {
        if (this.state.month === 0) {
            this.setState({
                year: --this.state.year,
                month: 11
            })
        } else {
            this.setState({
                month: --this.state.month
            })
        }
    }

    /**
     * 切换到下一个月
     * */
    nextMonth() {
        if (this.state.month === 11) {
            this.setState({
                year: ++this.state.year,
                month: 0
            })
        } else {
            this.setState({
                month: ++this.state.month
            })
        }
    }

    //选择日期
    datePick(day) {
        this.setState({day})
    }

    //切换日期选择器是否显示
    datePickerToggle() {
        this.refs.main.style.height =
            this.refs.main.style.height === '460px' ?
                '0px' : '460px'
    }

    //标记日期已经选择
    picked() {
        this.state.picked = true
    }

    render() {
        let props = {
            viewData: displayDaysPerMonth(this.state.year),
            fillterMonths: getMonths(this.props.reservations)
        }

        return (
            <div className="output">
                <div className="main" ref="main">
                    <CalendarHeader prevMonth={() => this.prevMonth()}
                                    nextMonth={() => this.nextMonth()}
                                    year={this.state.year}
                                    month={this.state.month}
                                    day={this.state.day}/>
                    <CalendarMain {...props}
                                  prevMonth={() => this.prevMonth()}
                                  nextMonth={() => this.nextMonth()}
                                  datePick={() => this.datePick()}
                                  year={this.state.year}
                                  month={this.state.month}
                                  day={this.state.day}/>
                </div>
            </div>
        )
    }
}