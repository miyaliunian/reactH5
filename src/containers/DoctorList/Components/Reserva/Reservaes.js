/**
 * Class: Reservaes
 * Author: wufei
 * Date: 2019/6/20
 * Description:
 *  可预约日历
 */
import React, {Component} from 'react'
import './style.less'
import {getDate} from "@utils/dayutils";

const getMonths = (data) => {
    let months = []
    data.map((item) => {
        let {oDay, oweekDay} = getDate(item)
        let Obj = {oDay, oweekDay}
        months.push(getDate(item))
    })
    return months
}

export default class Reservaes extends Component {
    render() {
        const {reservations} = this.props
        let days = getMonths(reservations)
        return (
            <div className={'reservaes'}>
                {days.map((day) => {
                    return (
                        <div className={'reservaes__box'} >
                            <div className={'reservaes__top'}>{day.oweekDay}</div>
                            <div className={'reservaes__bottom'}>{day.oDay}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}    



