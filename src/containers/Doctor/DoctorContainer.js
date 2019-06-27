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
        const {id, hosId, deptId} = this.props.location.state
        // console.log(`doctid=${id},hosid=${hosId},deptid=${deptId}`)
        this.props.doctorActions.loadClinicList(hosId,id)
        // this.props.doctorActions.loadReservationList(hosId, deptId, id, null)
    }


    pullingUpHandler() {
        console.log('上啦刷新')
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    fetchReservationList(data) {
        const {hosId, id} = data
        const {deptId} = this.props.location.state
        this.props.doctorActions.loadReservationList(hosId, id, 11368, null)
        console.log(data)
    }
}


const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchStatus(state),
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