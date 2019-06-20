/**
 * Class: Reservaes
 * Author: wufei
 * Date: 2019/6/20
 * Description:
 *  医生列表->按照日期选择->日期
 */
import React, {Component} from 'react'
import './style.less'
import {getDate} from "@utils/dayutils";

const getMonths = (data) => {
    let months = []
    data.map((item, index) => {
        let {oDay, oweekDay} = getDate(item)
        let Obj = {oDay, oweekDay}
        if (index === 0) {
            Obj.isSel = true
        } else {
            Obj.isSel = false
        }
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

    }

    render() {
        return (
            <div className={'reservaes'}>
                {this.state.days.map((day, index) => {
                    return (
                        <div key={index} className={day.isSel ? 'reservaes__box boxSel' : 'reservaes__box'}
                             onClick={() => this.boxClick(day,index)}>
                            <div className={'reservaes__top'}>{day.oweekDay}</div>
                            <div className={'reservaes__bottom'}>{day.oDay}</div>
                        </div>
                    )
                })}
                <div className={'reservaes__more'}>更多>></div>
            </div>
        )
    }


    componentWillReceiveProps(nextPros) {
        if (nextPros.reservations) {
            let days = getMonths(nextPros.reservations)
            this.setState({
                days: days
            })
        }
    }



    /**
     * 更新数据状态
     * @param dayObj
     */
    boxClick(dayObj,index) {
        const {reservations} = this.props
        let days = getMonths(reservations)
        days.map((item) => {
            if (item.oDay === dayObj.oDay) {
                item.isSel = true
            } else {
                item.isSel = false
            }
        })

        this.setState({
            days: days
        })
        this.props.fetchDoctors(reservations[index])
    }
}    



