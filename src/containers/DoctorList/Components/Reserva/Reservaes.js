/**
 * Class: Reservaes
 * Author: wufei
 * Date: 2019/6/20
 * Description:
 *  医生列表->按照日期选择->日期
 */
import React, {Component,Fragment} from 'react'
import {getDate} from '@utils/dayutils'

import './style.less'

const getMonths = data => {
    let months = []
    data.map((item, index) => {
        let {oMonth, spliceDay, oweekDay} = getDate(item)

        let Obj = {oMonth, spliceDay, oweekDay}
        index === 0 ? (Obj.isSel = true) : (Obj.isSel = false)
        months.push(Obj)
    })
    return months
}

export default class Reservaes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            days: []
        }
        this.renderMore = false
    }

    renderFilterMore() {
        const {filterMore} = this.props
        if (filterMore != '') {
            return (
                <div className={'reservaes-box'}>
                    <div>{filterMore.oweekDay}</div>
                    <div style={{fontSize: '11px'}}>{filterMore.oMonth + '-' + filterMore.spliceDay}</div>
                </div>
            )
        } else {
            return '更多 >>'
        }
    }

    render2(){

    }

    render() {
        const {filterMoreClick} = this.props
        let res = this.state.days.length
        let content
        if (res>0) {
            content = (
                <div className={'reservaes-wrapper'}>
                    <ul className={'reservaes-cacl'}>
                        {this.state.days.map((day, index) => {
                            let cls = 'reservaes-box'
                            if (day.isSel) {
                                cls += ' reservaes-box active'
                            }
                            return (
                                <li key={index} className={cls} onClick={() => this.boxClick(day, index)}>
                                    <div>{day.oweekDay}</div>
                                    <div style={{fontSize: '11px'}}>{day.oMonth + '-' + day.spliceDay}</div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className={'reservaes-more'} onClick={filterMoreClick}>
                        {this.renderFilterMore()}
                    </div>
                </div>
            )
        } else {
            content = <div></div>
        }
        return (
            <Fragment>
                {content}
            </Fragment>
        )
    }

    componentWillReceiveProps(nextPros) {
        if (nextPros.reservations && nextPros.reservations.length > 0 && this.state.days.length === 0) {
            let days = getMonths(nextPros.reservations)

            this.setState({
                days: days,
            })
        }
    }

    /**
     * 更新数据状态
     * @param dayObj
     */
    boxClick(dayObj, index) {
        const {reservations, filterItemClick} = this.props
        let days = getMonths(reservations)
        days.map(item => {
            if (item.spliceDay === dayObj.spliceDay) {
                item.isSel = true
            } else {
                item.isSel = false
            }
        })

        this.setState({
            days: days
        })
        filterItemClick(reservations[index])
    }
}
