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
import {Icon, Modal, List, Radio} from 'antd-mobile'
import posed from 'react-pose'
import {getDate} from '@utils/dayutils'
import {Link, withRouter} from 'react-router-dom'
import './style.less'

/**
 * 样式文件
 * @type {<PoseElementProps & <any>>}
 */
const Box = posed.div({
    hidden: {opacity: 0},
    visible: {opacity: 1}
})

class DoctorVisiting extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            timeIntervalShow: false,
            timeIntervalValue: 0,
        }
        this.defSelClinic = ''
        //选中的预约信息
        this.reservationInfoSel = {}
    }


    render() {
        const {isLastPage, clinicData, reservationData, timeInterval} = this.props
        if (this.defSelClinic === '') {
            if (Array.isArray(clinicData) && clinicData.length > 0) {
                this.defSelClinic = clinicData[0].name
            }
        }
        const {isVisible, timeIntervalValue} = this.state
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
                <div className={'doctorVisiting__list'}
                     ref={'doctorVisitingList'}
                >
                    <div>
                        {reservationData.map((item, index) => {
                            // let regFee = item.regFee.toFixed(2)
                            return (
                                <div className={'doctorVisiting__item border-bottom'} key={index}
                                     onClick={() => this.navPage(item)}
                                >
                                    {this.renderDesc(item)}
                                    <div className={'item__right'}>
                                        <div className={'item__right__price'}>￥{item.regFee.toFixed(2)}</div>
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
                <Modal
                    popup
                    visible={this.state.timeIntervalShow}
                    title={'预约信息'}
                    onClose={() => this.onTimeIntervalClose(0)}
                    animationType="slide-up"
                    afterClose={() => {
                    }}
                    footer={[{
                        text: '取消', onPress: () => this.onTimeIntervalClose(1)
                    }, {
                        text: '确定', onPress: () => this.onTimeIntervalClose(2)
                    }]}
                >

                    <List className="doctorVisiting__timeInterval">
                        {timeInterval.map(i => {
                            return (
                                <Radio.RadioItem
                                    key={i.id}
                                    checked={timeIntervalValue === i.id}
                                    onChange={() => this.onChange(i.id)}
                                >
                                    {this.reservationInfoSel.noon} {i.beginTime} - {i.endTime}
                                </Radio.RadioItem>
                            )
                        })}
                    </List>
                </Modal>
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
        this.reservationInfoSel = data
        this.props.doctorActions.loadTimeInterval(this.props.doctorInfo, data, this)

    }


    /**
     * 时间段选项
     * @param value
     */
    onChange = (value) => {
        this.setState({
            timeIntervalValue: value,
        });
    };


    //关闭时间段Modal
    onTimeIntervalClose(target) {
        const {doctorInfo, timeInterval} = this.props
        //只有点击确定按钮，才跳转页面
        switch (target) {
            case 2:
                let timeFilter = timeInterval.filter(item =>
                    item.id === this.state.timeIntervalValue
                )
                let path = {
                    pathname: '/reservation',
                    state: {
                        doctorInfo: doctorInfo,
                        reservationInfo: this.reservationInfoSel,
                        timeInterval: timeFilter
                    }
                }
                this.props.history.push(path)
                break
            default:
                break
        }
        this.setState({
            timeIntervalShow: false
        })
    }
}

export default withRouter(DoctorVisiting)
