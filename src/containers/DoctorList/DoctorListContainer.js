/**
 * Class: DoctorListContainer
 * Author: wufei
 * Date: 2019-06-17
 * Description:
 *    门诊：医生列表
 */
import React, {Component, Fragment} from 'react';
import Header from "@components/Header/NavBar";
import {Icon} from 'antd-mobile';
import DoctorTabs from "@containers/DoctorList/Components/Tab/DoctorTabs";
import DoctorItem from "@containers/DoctorList/Components/Item/DoctorItem";
import Reservaes from "@containers/DoctorList/Components/Reserva/Reservaes";
import {Modal} from 'antd-mobile'
import Calendar from "@components/Calendar/Calendar";
import {getDate, formateTimeStep} from "@utils/dayutils";
import {connect} from "react-redux";
import {
    actions as doctorListActions,
    getFetchStatus,
    getDoctorList,
    getReservationList,
    getSeeDate
} from "@reduxs/modules/doctorList";
import {bindActionCreators} from "redux";
import './style.less'
import LoadingMask from "@components/Loading/LoadingMask";


const getMonths = (data) => {
    let months = []
    data.map((item) => {
        let {oDay, oweekDay} = getDate(item)
        let Obj = {oDay, oweekDay}
        months.push(getDate(item))
    })
    return months
}

class DoctorListContainer extends Component {

    state = {
        isShow: false
    };

    render() {
        const {name} = this.props.match.params
        const {fetchingStatus, doctors, reservations, seeDate} = this.props
        return (
            <div className={'doctorList'}>
                <Header title={name} isRight={false} onBack={this.handleBack}/>
                <DoctorTabs tabSel={(target) => this.tabSel(target)}/>
                <div ref={'reservations'}>
                    {reservations ?
                        <Reservaes reservations={reservations}
                                   fetchDoctors={(dayObj) => this.fetchDoctors(dayObj)}
                                   showModal={() => this.showModal()}
                        />
                        : null
                    }
                </div>
                <DoctorItem data={doctors}/>
                <Modal
                    visible={this.state.isShow}
                    title=""
                    afterClose={() => {
                    }}
                >
                    <div className={'calendar_box'}>
                        <Header title={'选择出诊日期'} isRight={false} onBack={() => this.closeModal()}/>
                        <Calendar reservations={reservations} markSelDate={(date) => {
                            this.markSelDate(date)
                        }}/>
                    </div>
                </Modal>
                {fetchingStatus ? <LoadingMask/> : null}
            </div>
        )
    }


    componentDidMount() {
        this.resizeReservationsBox()
        this.refs.reservations.style.height = 0
        const {id} = this.props.match.params
        this.props.doctorListActions.loadDoctorList(id)
        this.props.doctorListActions.loadReservationList(id)
    }


    /**
     * 按专家、日期预约 条件筛选 数据
     * @param target(1: 专家、2:日期)
     */
    tabSel(target) {
        const {id} = this.props.match.params
        if (target === 1) {
            //按专家预约
            this.resizeReservationsBox()
            this.props.doctorListActions.loadDoctorList(id)
        } else {
            const {reservations} = this.props
            if (!reservations) {
                return
            }
            const date = formateTimeStep(reservations[0])
            //按日期预约
            this.refs.reservations.style.height = "60px"
            this.props.doctorListActions.loadDoctorList(id, date)
        }
    }


    /**
     * MODAL日历:选择某天，然后关闭
     * 1：关闭Modal,
     * 2: 通过过滤条件，过滤数据
     * @param date
     */
    markSelDate(date) {
        this.closeModal()
        const {id} = this.props.match.params
        this.props.doctorListActions.loadDoctorList(id, date)
    }

    /**
     * 默认状态:隐藏预约日期
     */
    resizeReservationsBox() {
        this.refs.reservations.style.height = 0
    }

    /**
     * 通过日期过滤数据
     * @param param
     */
    fetchDoctors(dayObj) {
        const {id} = this.props.match.params
        const date = formateTimeStep(dayObj)
        this.props.doctorListActions.setSeeDate(dayObj)
        this.props.doctorListActions.loadDoctorList(id, date)
    }


    handleBack = () => {
        this.props.history.goBack()
    }

    /**
     * 日历:显示/隐藏
     */
    showModal() {
        this.setState({
            isShow: true
        })
    }


    /**
     * 日历Modal:隐藏
     */
    closeModal() {
        this.setState({isShow: false})
    }

}

/**
 * 刷新状态、医生列表、可预约日历,上一次选中的日期
 * @param state
 * @returns {{fetchingStatus: *, doctors: *, reservations: *, seeDate: *}}
 */
const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchStatus(state),
        doctors: getDoctorList(state),
        reservations: getReservationList(state),
        seeDate: getSeeDate(state)
    }
}


/**
 * store.dispatch
 * @param dispatch
 * @returns {{doctorListActions: {loadDoctorList: function(*=), loadReservationList: function(*=)}|ActionCreator<any>|ActionCreatorsMapObject<any>}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        doctorListActions: bindActionCreators(doctorListActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorListContainer)