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
import {Link, withRouter} from 'react-router-dom'
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

class DoctorVisiting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isVisible: false
        }
        this.defSelClinic = ''
    }


    render() {
        const {isLastPage, clinicData, reservationData} = this.props
        if (this.defSelClinic === '') {
            if (Array.isArray(clinicData) && clinicData.length > 0) {
                this.defSelClinic = clinicData[0].name
            }
        }
        const {isVisible} = this.state
        return (
            <div className={'doctorVisiting'}>
                <div className={'doctorVisiting__title border-bottom'}>
                    <div>出诊时间</div>
                    <div className={'doctorVisiting__title__right'} onClick={() => this.arrowClick(clinicData)}>
                        <div>{this.defSelClinic}</div>
                        <Icon type={'left'}/>
                    </div>
                </div>
                <Box className="clinic__box border" pose={isVisible ? 'visible' : 'hidden'} ref={'clinic__box'}>
                    <div>
                        <ul>
                            {clinicData.map(item => {
                                return (
                                    <span key={item.id} className={'box__item border-bottom'}
                                          onClick={() => this.itemClick(item)}>{item.name}</span>
                                )
                            })}
                        </ul>
                    </div>
                </Box>
                <div className={'doctorVisiting__list'} ref={'doctorVisitingList'}>
                    <div>
                        {reservationData.map((item, index) => {
                            return (

                                <div className={'doctorVisiting__item border-bottom'} key={index}
                                     onClick={() => this.navPage(item)}
                                >
                                    {this.renderDesc(item)}
                                    <div className={'item__right'}>
                                        <div className={'item__right__price'}>￥{item.regFee}.00</div>
                                        <div
                                            className={item.status != 2 ? 'item__right__icon icon__selBg' : 'item__right__icon'}>{item.status === 2 ? '约满' : (item.status === 0 ? '停诊' : '预约')}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <RefreshFooter refreshStatus={isLastPage}/>
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


        //诊室滚动列表
        this.clinicScroll = new Bscroll(this.refs.clinic__box, {
            mouseWheel: true,
            click: true,
            tap: true,
            useTransition: false
        })

    }


    /**
     * 右侧箭头被点击
     * @param clinicData
     */
    arrowClick(clinicData) {
        this.setState({isVisible: !this.state.isVisible})
    }


    /**
     * 门诊下拉列表选中,并关闭
     * @param data
     */
    itemClick(data) {
        this.setState({
            isVisible: false
        })
        this.defSelClinic = data.name
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
            <div
                className={'doctorVisiting__item__desc'}>
                {oMonth < 10 ? ("0" + oMonth + "-" + oDay) : (oMonth + "-" + oDay)} {oweekDay} {noon} {reglevlName}
            </div>
        )
    }


    /**
     * 跳转页面
     * @param data
     */
    navPage(data) {
        let path = {
            pathname: '/reservation',
            state: {doctorInfo: this.props.doctorInfo, reservationInfo: data}
        }
        this.props.history.push(path)
    }
}

export default withRouter(DoctorVisiting)
