/**
 * Class: DoctorContainer
 * Author: wufei
 * Date: 2019/6/25
 * Description:
 *  医生详情
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import LoadingMask from "@components/Loading/LoadingMask";
import DoctorTitle from "@containers/Doctor/Components/DoctorTitle/DoctorTitle";
import DoctorDesc from "@containers/Doctor/Components/DoctorDesc/DoctorDesc";
import DoctorVisiting from "@containers/Doctor/Components/DoctorVisiting/DoctorVisiting";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions as doctorActions,
    getFetchStatus,
    getIsLastPage,
    getClinicsData,
    getReservationsData
} from "@reduxs/modules/doctor";
import './style.less'

class DoctorContainer extends Component {
    render() {

        const {fetchingStatus, clinicData, reservationData} = this.props
        return (
            <div className={'doctor'}>
                <Header title={'医生详情'} isRight={false} onBack={this.handleBack}/>
                <DoctorTitle data={this.props.location.state}/>
                <DoctorDesc/>
                <div className={'doctor__interval'}/>
                <DoctorVisiting
                    clinicData={clinicData}
                    reservationData={reservationData}
                    fetchReservationList={(item) => this.fetchReservationList(item)}
                    pullingUpHandler={() => this.pullingUpHandler()}
                />
                {fetchingStatus ? <LoadingMask/> : null}
            </div>
        )
    }

    componentDidMount() {
        const {hosId, id: doctId} = this.props.location.state
        this.props.doctorActions.loadClinicList(hosId, doctId)
    }


    pullingUpHandler() {
        console.log('上啦刷新')
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    fetchReservationList(data) {
        const {hosId, id: doctId} = this.props.location.state;
        const {id: deptId} = data
        this.props.doctorActions.loadReservationList(hosId, deptId, doctId, null, false)
    }
}


const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchStatus(state),
        isLastPage: getIsLastPage(state),
        clinicData: getClinicsData(state),
        reservationData: getReservationsData(state)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        doctorActions: bindActionCreators(doctorActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorContainer)