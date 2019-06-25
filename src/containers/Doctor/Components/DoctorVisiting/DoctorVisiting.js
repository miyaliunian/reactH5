/**
 * Class: Body
 * Author: wufei
 * Date: 2019/6/25
 * Description:
 *
 */
import React, {Component} from 'react'
import Bscroll from 'better-scroll'
import './style.less'

const dataSources = [
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '06-26 周三  上午  普通门诊',
        'price': '￥25'
    },
]

export default class DoctorVisiting extends Component {
    render() {
        return (
            <div className={'doctorVisiting'}>
                <div className={'doctorVisiting__title'}>
                    <div>出诊时间</div>
                    <div>儿科中心</div>
                </div>
                <div className={'doctorVisiting__list'} ref={'doctorVisitingList'}>
                    <div>
                        {dataSources.map((item, index) => {
                            return (
                                <div className={'doctorVisiting__item'} key={index}>
                                    <div>{item.time}</div>
                                    <div className={'item__right'}>
                                        <div className={'item__right__price'}>{item.price}</div>
                                        <div className={'item__right__icon'}>预约</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.scroll = new Bscroll(this.refs.doctorVisitingList, {
            scrollY: true,
            click: true
        })
    }
}    
