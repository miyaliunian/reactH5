/**
 * Class: DoctorContainer
 * Author: wufei
 * Date: 2019/6/25
 * Description:
 *  医生详情
 */
import React, {Component} from 'react'

import LoadingMask from "@components/Loading/LoadingMask";
import DoctorTitle from "@containers/Doctor/Components/DoctorTitle/DoctorTitle";
import DoctorDesc from "@containers/Doctor/Components/DoctorDesc/DoctorDesc";
import DoctorVisiting from "@containers/Doctor/Components/DoctorVisiting/DoctorVisiting";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions as doctorActions,
    getFetchingStatus,
    getIsLastPage,
    getClinicsData,
    getReservationsData,
    getTimeInterval
} from "@reduxs/modules/doctor";
import './style.less'
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";

class DoctorContainer extends Component {
    render() {
        const {fetchingStatus, isLastPage, clinicData, reservationData, timeInterval} = this.props
        const {introduction, skills} = this.props.location.state
        return (
            <div className={'doctor'}>
                <SafeAreaView showBar={true} title={'医生详情'} isRight={false} handleBack={this.handleBack}>
                    <DoctorTitle data={this.props.location.state}/>
                    <DoctorDesc introduction={introduction} skills={skills}/>
                    <div className={'doctor__interval'}/>
                    <DoctorVisiting
                        {...this.props}
                        doctorInfo={this.props.location.state}
                        clinicData={clinicData}
                        reservationData={reservationData}
                        fetchReservationList={(item) => this.fetchReservationList(item)}
                        timeInterval={timeInterval}
                        isLastPage={isLastPage}
                        pullingUpHandler={() => this.pullingUpHandler()}
                    />
                </SafeAreaView>
                {fetchingStatus ? <LoadingMask/> : null}

            </div>
        )
    }

    componentDidMount() {
        this.initailData()
    }


    initailData() {
        this.props.doctorActions.reset()
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
        this.props.doctorActions.fetchReservationList(hosId, deptId, doctId, null)
    }

}


const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchingStatus(state),
        isLastPage: getIsLastPage(state),
        clinicData: getClinicsData(state),
        reservationData: getReservationsData(state),
        timeInterval: getTimeInterval(state)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        doctorActions: bindActionCreators(doctorActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorContainer)