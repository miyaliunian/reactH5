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
import {connect} from "react-redux";
import {
    actions as doctorListActions,
    getFetchStatus,
    getDoctorList,
    getReservationList
} from "@reduxs/modules/doctorList";
import {bindActionCreators} from "redux";
import './style.less'


class DoctorListContainer extends Component {

    state = {};

    render() {
        const {name} = this.props.match.params
        const {doctors, reservations} = this.props
        return (
            <div className={'doctorList'}>
                <Header title={name} isRight={false} onBack={this.handleBack}/>
                <DoctorTabs tabSel={(target) => this.tabSel(target)}/>
                <div ref={'reservations'}>
                    <Reservaes reservations={reservations}/>
                </div>
                <DoctorItem data={doctors} tabSel={1}/>
                {/*<Calendar/>*/}
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

    tabSel(target) {
        if (target === 1) {
            this.resizeReservationsBox()
        } else {
            this.refs.reservations.style.height = "60px"
        }
    }

    /**
     * 默认状态隐藏预约日期
     */
    resizeReservationsBox() {
        this.refs.reservations.style.height = 0
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