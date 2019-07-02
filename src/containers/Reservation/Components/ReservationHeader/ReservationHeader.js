/**
 * Class: ReservationHeader
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *
 */
import React, {Component} from 'react'
import {fromateTimeStepStr} from '@utils/dayutils'
import './style.less'

export default class ReservationHeader extends Component {
    render() {
        const {deptName, name, title, hosName} = this.props.doctorInfo
        const {noon, regFee, reglevlName, seeDate} = this.props.reservationInfo
        return (
            <div className={'reservationHeader'}>
                <div className={'reservationHeader__desc border-bottom'}>
                    {this.drawReact(name)}
                    <span className={'reservationHeader__type'}>{name}</span>
                    <span className={'reservationHeader__title'}>{title}</span>
                </div>
                <div className={'reservationHeader__info border-bottom'}>
                    <div className={'reservationHeader__cell'}>
                        <span className={'reservationHeader__left_colu'}>就诊医院</span>
                        <div className={'reservationHeader__right_colu'}>
                            <span className={'reservationHeader__right_colu__txt'}>{hosName}</span>
                        </div>
                    </div>
                    <div className={'reservationHeader__cell'}>
                        <span className={'reservationHeader__left_colu'}>就诊科室</span>
                        <div className={'reservationHeader__right_colu'}>
                            <span className={'reservationHeader__right_colu__txt'}>{deptName}</span>
                        </div>
                    </div>
                    <div className={'reservationHeader__cell'}>
                        <span className={'reservationHeader__left_colu'}>门诊时间</span>
                        <div className={'reservationHeader__right_colu'}>
                            <span
                                className={'reservationHeader__right_colu__txt'}>{fromateTimeStepStr(seeDate)}{noon} </span>
                            {/*<span className={'reservationHeader__right_colu__txt'}> 13：30-17：30</span>*/}
                        </div>
                    </div>
                    <div className={'reservationHeader__cell'}>
                        <span className={'reservationHeader__left_colu'}>门诊类型</span>
                        <div className={'reservationHeader__right_colu'}>
                            <span className={'reservationHeader__right_colu__txt'}>{reglevlName}</span>
                        </div>
                    </div>
                    <div className={'reservationHeader__cell'}>
                        <span className={'reservationHeader__left_colu'}>挂号费用</span>
                        <div className={'reservationHeader__right_colu'}>
                            <span className={'reservationHeader__right_colu__txt right__price'}>￥{regFee}.00</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    drawReact(data) {
        let str = data[data.length - 1]
        return (
            <span className={'reservationHeader__avatar'}>{str}</span>
        )
    }

}
