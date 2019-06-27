/**
 * Class: Body
 * Author: wufei
 * Date: 2019/6/25
 * Description:
 *
 */
import React, {Component} from 'react'
import RefreshFooter from "@components/Refresh/Footer/RefreshFooter";
import Bscroll from 'better-scroll'
import {Icon} from 'antd-mobile'
import posed from 'react-pose'
import './style.less'

const dataSources = [
    {
        'time': '01 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '02 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '03 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '04 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '05 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '6 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '7 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '8 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '9 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '10 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '11 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '12 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '13 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '14 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '15 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '16 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '17 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '18 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '19 周三  上午  普通门诊',
        'price': '￥25'
    },
    {
        'time': '20 周三  上午  普通门诊',
        'price': '￥25'
    },
]

const Box = posed.div({
    hidden: {opacity: 0},
    visible: {opacity: 1}
})

export default class DoctorVisiting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isRefresh: false,
            isVisible: false
        }
    }

    render() {
        const {clinicData} = this.props
        let defSelClinic = ''
        if (Array.isArray(clinicData) && clinicData.length > 0) {
            defSelClinic = clinicData[0].name
        }
        const {isVisible} = this.state
        return (
            <div className={'doctorVisiting'}>
                <div className={'doctorVisiting__title'}>
                    <div>出诊时间</div>
                    <div className={'doctorVisiting__title__right'} onClick={() => this.arrowClick(clinicData)}>
                        <div>{defSelClinic}</div>
                        <Icon type={'left'}/>
                    </div>
                </div>
                <Box className="clinic__box" pose={isVisible ? 'visible' : 'hidden'} ref={'clinic__box'}>
                    <div>
                        <ul>
                            {clinicData.map(item => {
                                return (
                                    <span key={item.id} className={'box__item'}>{item.name}</span>
                                )
                            })}
                        </ul>
                    </div>
                </Box>
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
                        <RefreshFooter refreshStatus={this.state.isRefresh}/>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {


        //预约滚动列表
        this.scroll = new Bscroll(this.refs.doctorVisitingList, {
            click: true,
            tap: true,
            pullUpLoad: {
                threshold: 80
            },
            useTransition: false
        })
        this.scroll.on('pullingUp', this.props.pullingUpHandler);
        setTimeout(() => (
            this.setState({
                isRefresh: true
            })
        ), 3000)


        //诊室滚动列表
        this.clinicScroll = new Bscroll(this.refs.clinic__box, {
            click: true,
            tap: true,
            useTransition: false
        })

    }


    //右侧箭头被点击
    arrowClick(clinicData) {
        this.setState({isVisible: !this.state.isVisible})
        console.log(clinicData)
    }
}    
