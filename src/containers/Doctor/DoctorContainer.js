/**
 * Class: DoctorContainer
 * Author: wufei
 * Date: 2019/6/25
 * Description:
 *  医生详情
 */
import React, { Component } from 'react'

import LoadingMask from '@components/Loading/LoadingMask'
import DoctorTitle from '@containers/Doctor/Components/DoctorTitle/DoctorTitle'
import DoctorDesc from '@containers/Doctor/Components/DoctorDesc/DoctorDesc'
import DoctorVisiting from '@containers/Doctor/Components/DoctorVisiting/DoctorVisiting'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actions as doctorActions,
  getFetchingStatus,
  getIsLastPage,
  getClinicsData,
  getReservationsData,
  getTimeInterval
} from '@reduxs/modules/doctor'
import './style.less'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'

class DoctorContainer extends Component {
  render() {
    const { isLastPage, clinicData, reservationData, timeInterval, location } = this.props
    const { introduction, skills } = location.state.doctorInfo
    return (
      <SafeAreaView showBar={true} title={'医生详情'} isRight={false} handleBack={this.handleBack} ref={'doctor'}>
        <div className={'doctor'}>
          <div id={'doctorDetailHeader'} className={'doctorDetailHeader'}>
            <DoctorTitle data={location.state.doctorInfo} />
            <DoctorDesc introduction={introduction} skills={skills} />
            <div className={'doctor__interval'} />
          </div>
          <DoctorVisiting
            {...this.props}
            doctorInfo={location.state.doctorInfo}
            clinicData={clinicData}
            reservationData={reservationData}
            fetchReservationList={item => this.fetchReservationList(item)}
            timeInterval={timeInterval}
            isLastPage={isLastPage}
            pullingUpHandler={() => this.pullingUpHandler()}
          />
          <LoadingMask />
        </div>
      </SafeAreaView>
    )
  }

  componentDidMount() {
    //顶部禁止滑动
    document.getElementById('doctorDetailHeader').addEventListener(
      'touchmove',
      event => {
        event.preventDefault()
      },
      {
        passive: false //  禁止 passive 效果
      }
    )
    this.initailData()
  }

  componentWillUnmount() {
    this.props.doctorActions.reset()
  }

  initailData() {
    const { location } = this.props
    const { hosId, id: doctId } = location.state.doctorInfo
    const { name: deptName } = location.state.deptInfo
    const {
      doctorActions: { loadClinicList }
    } = this.props
    loadClinicList(hosId, doctId, deptName)
  }

  pullingUpHandler() {
    console.log('上啦刷新')
  }

  handleBack = () => {
    this.props.history.goBack()
  }

  fetchReservationList(data) {
    const { hosId, id: doctId } = this.props.location.state.doctorInfo
    const { id: deptId } = data
    this.props.doctorActions.fetchReservationList(hosId, deptId, doctId, null)
  }
}

const mapStateToProps = state => {
  return {
    fetchingStatus: getFetchingStatus(state),
    isLastPage: getIsLastPage(state),
    clinicData: getClinicsData(state),
    reservationData: getReservationsData(state),
    timeInterval: getTimeInterval(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doctorActions: bindActionCreators(doctorActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorContainer)
