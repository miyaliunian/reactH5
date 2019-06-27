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
import {getDate} from '@utils/dayutils'
import './style.less'

const dataSources = [
    {
        'seeDate': 1561564800000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561651200000,
        'noon': '上午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561651200000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561737600000,
        'noon': '上午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561737600000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 1
    },
    {
        'seeDate': 1561564800000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561651200000,
        'noon': '上午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561651200000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561737600000,
        'noon': '上午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561737600000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 1
    },
    {
        'seeDate': 1561564800000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561651200000,
        'noon': '上午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561651200000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561737600000,
        'noon': '上午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561737600000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 1
    },
    {
        'seeDate': 1561564800000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561651200000,
        'noon': '上午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561651200000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561737600000,
        'noon': '上午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561737600000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 1
    },
    {
        'seeDate': 1561564800000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561651200000,
        'noon': '上午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561651200000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561737600000,
        'noon': '上午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 2
    },
    {
        'seeDate': 1561737600000,
        'noon': '下午',
        'reglevlName': "普通门诊",
        'regFee': '12',
        'status': 1
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
        const {clinicData, reservationData} = this.props
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
                                    <span key={item.id} className={'box__item'}
                                          onClick={() => this.itemClick(item)}>{item.name}</span>
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
                                    {this.renderDesc(item)}
                                    <div className={'item__right'}>
                                        <div className={'item__right__price'}>￥{item.regFee}</div>
                                        <div
                                            className={item.status != 2 ? 'item__right__icon icon__selBg' : 'item__right__icon'}>{item.status === 2 ? '约满' : (item.status === 0 ? '停诊' : '预约')}
                                        </div>
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
            mouseWheel: true,
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
            mouseWheel: true,
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

    /**
     * 门诊下拉列表选中
     * @param data
     */
    itemClick(data) {
        this.props.fetchReservationList(data)
    }


    /**
     * 格式化字符串
     * @param data
     * @returns {*}
     */
    renderDesc(data) {
        const {seeDate, noon, reglevlName} = data
        const {oMonth, oDay, oweekDay} = getDate(seeDate)
        return (
            <div className={'doctorVisiting__item__desc'}>{oMonth < 10 ? ("0" + oMonth + "-" + oDay) : (oMonth + "-" + oDay)} {oweekDay} {noon} {reglevlName}</div>
        )
    }
}    
