import React, {Component} from 'react';
import './style.less'

export default class CalendarMain extends Component {

    state = {
        week_names: ['日', '一', '二', '三', '四', '五', '六'],
    }

    //处理日期选择事件，如果是当月，触发日期选择；如果不是当月，切换月份
    handleDatePick(index, styleName) {
        switch (styleName) {
            case 'thisMonth':
                let month = this.props.viewData[this.props.month]
                this.props.datePick(month[index])
                break
            case 'prevMonth':
                this.props.prevMonth()
                break
            case 'nextMonth':
                this.props.nextMonth()
                break
        }
    }

    //处理选择时选中的样式效果
    //利用闭包保存上一次选择的元素，
    //在月份切换和重新选择日期时重置上一次选择的元素的样式
    changeColor() {
        let previousEl = null
        return function (event) {
            let name = event.target.nodeName.toLocaleLowerCase()
            if (previousEl && (name === 'i' || name === 'td')) {
                previousEl.style = ''
            }
            if (event.target.className === 'thisMonth') {
                event.target.style = 'background:#F8F8F8;color:#000'
                previousEl = event.target
            }
        }
    }

    //绑定颜色改变事件
    componentDidMount() {
        let changeColor = this.changeColor()
        // document.getElementById('calendarContainer').addEventListener('click', changeColor, false);

    }

    render() {
        return (
            <div className="calendar_layout">
                {this.renderWeekHeader()}
                {this.renderWeekBody()}
            </div>
        )
    }


    renderWeekHeader() {
        return (
            <div className="calendar_header" ref="header" style={{height: 45}}>
                {
                    this.state.week_names.map((name, index) => {
                        return (
                            <div className="calendar_header_box" key={index}>
                                <div className={'calendar_header_txt'}>{name}</div>
                            </div>
                        )
                    })
                }

            </div>
        );
    }

    renderWeekBody() {
        //确定当前月数据中每一天所属的月份，以此赋予不同className
        let month = this.props.viewData[this.props.month],
            rowsInMonth = [],
            i = 0,
            styleOfDays = (() => {
                let i = month.indexOf(1),
                    j = month.indexOf(1, i + 1),
                    arr = new Array(42)
                arr.fill('prevMonth', 0, i)
                arr.fill('thisMonth', i, j)
                arr.fill('nextMonth', j)
                return arr
            })()

        //把每一个月的显示数据以7天为一组等分
        month.forEach((day, index) => {
            if (index % 7 === 0) {
                rowsInMonth.push(month.slice(index, index + 7))
            }
        })

        return (<div className={'calendar_body'}>
            {
                rowsInMonth.map((row, rowIndex) => {
                    return (
                        <div className={'calendar_body_row'} key={rowIndex}>
                            {
                                row.map((day) => {
                                    return (
                                        <div className={'calendar_body_box'}
                                             onClick={
                                                 this.handleDatePick.bind
                                                 (this, i, styleOfDays[i])}
                                             key={i++}>
                                            <div className={'calendar_body_txt'}>
                                                {day}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>)
    }
}