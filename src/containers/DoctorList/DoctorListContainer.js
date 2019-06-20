/**
 * Class: DoctorListContainer
 * Author: wufei
 * Date: 2019-06-17
 * Description:
 *    门诊：医生列表
 */
import React, {Component, Fragment} from 'react';
import Header from "@components/Header/NavBar";
import DoctorTabs from "@containers/DoctorList/Components/Tab/DoctorTabs";
import DoctorItem from "@containers/DoctorList/Components/Item/DoctorItem";
import Reservaes from "@containers/DoctorList/Components/Reserva/Reservaes";
import Calendar from "@components/Calendar/Calendar";
import {getDate, formateTimeStep} from "@utils/dayutils";
import {connect} from "react-redux";
import {
    actions as doctorListActions,
    getFetchStatus,
    getDoctorList,
    getReservationList
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

    state = {};

    render() {
        const {name} = this.props.match.params
        const {fetchingStatus, doctors, reservations} = this.props
        return (
            <div className={'doctorList'}>
                <Header title={name} isRight={false} onBack={this.handleBack}/>
                <DoctorTabs tabSel={(target) => this.tabSel(target)}/>
                <div ref={'reservations'}>
                    <Reservaes reservations={reservations} fetchDoctors={(dayObj) => this.fetchDoctors(dayObj)}/>
                </div>
                <DoctorItem data={doctors}/>
                {/*<Calendar/>*/}
                {fetchingStatus ? <LoadingMask/> : null}
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        this.resizeReservationsBox()
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
        const {reservations} = this.props
        const date = formateTimeStep(reservations[0])
        if (target === 1) {
            //按专家预约
            this.resizeReservationsBox()
            this.props.doctorListActions.loadDoctorList(id)
        } else {
            //按日期预约
            this.refs.reservations.style.height = "60px"
            this.props.doctorListActions.loadDoctorList(id, date)
        }
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
        this.props.doctorListActions.loadDoctorList(id, date)
    }

}

/**
 * 刷新状态、医生列表、可预约日历
 * @param state
 * @returns {{fetchingStatus: *, doctors: *, Reservations: *}}
 */
const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchStatus(state),
        doctors: getDoctorList(state),
        reservations: getReservationList(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doctorListActions: bindActionCreators(doctorListActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorListContainer)