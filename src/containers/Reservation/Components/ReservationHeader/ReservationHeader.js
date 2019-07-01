/**
 * Class: ReservationHeader
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *
 */
import React, {Component} from 'react'
import './style.less'

export default class ReservationHeader extends Component {
    render() {
        return (
            <div className={'reservationHeader'}>
                <div className={'reservationHeader__desc border-bottom'}>
                    {this.drawReact()}
                    <span className={'reservationHeader__type'}>普通号</span>
                    <span className={'reservationHeader__title'}>主治医师</span>
                </div>
                <div className={'reservationHeader__info border-bottom'}>
                    <div className={'reservationHeader__cell'}>
                        <span className={'reservationHeader__left_colu'}>就诊医院</span>
                        <div className={'reservationHeader__right_colu'}>
                            <span className={'reservationHeader__right_colu__txt'}>如皋博爱医院有限公司</span>
                        </div>
                    </div>
                    <div className={'reservationHeader__cell'}>
                        <span className={'reservationHeader__left_colu'}>就诊科室</span>
                        <div className={'reservationHeader__right_colu'}>
                            <span className={'reservationHeader__right_colu__txt'}>儿科</span>
                        </div>
                    </div>
                    <div className={'reservationHeader__cell'}>
                        <span className={'reservationHeader__left_colu'}>门诊时间</span>
                        <div className={'reservationHeader__right_colu'}>
                            <span className={'reservationHeader__right_colu__txt'}>2019年07月02日 周二 下午 </span>
                            <span className={'reservationHeader__right_colu__txt'}> 13：30-17：30</span>
                        </div>
                    </div>
                    <div className={'reservationHeader__cell'}>
                        <span className={'reservationHeader__left_colu'}>门诊类型</span>
                        <div className={'reservationHeader__right_colu'}>
                            <span className={'reservationHeader__right_colu__txt'}>普通门诊</span>
                        </div>
                    </div>
                    <div className={'reservationHeader__cell'}>
                        <span className={'reservationHeader__left_colu'}>挂号费用</span>
                        <div className={'reservationHeader__right_colu'}>
                            <span className={'reservationHeader__right_colu__txt'}>￥10.00</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    drawReact() {
        return (
            <span className={'reservationHeader__avatar'}>号</span>
        )
    }

}
