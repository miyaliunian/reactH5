/**
 * Class: DoctorListContainer
 * Author: wufei
 * Date: 2019-06-17
 * Description:
 *    首页->医院列表->科室选择->医生列表
 */
import React, { Component } from 'react'
import DoctorTabs from '@containers/DoctorList/Components/Tab/DoctorTabs'
import DoctorItem from '@containers/DoctorList/Components/Item/DoctorItem'
import Calendar from '@components/Calendar/Calendar'
import LoadingMask from '@components/Loading/LoadingMask'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
import { formateTimeStep, getDate } from '@utils/dayutils'
import { connect } from 'react-redux'

//Redux
import { bindActionCreators } from 'redux'
import { actions as doctorTabsActions, getActionTabKey } from '@reduxs/modules/doctorTabs'
import {
  actions as doctorListActions,
  getFetchStatus,
  getDoctorList,
  getReservationList,
  getSeeDate
} from '@reduxs/modules/doctorList'

//样式
import './style.less'
import { DOCTORTABKAY } from '@api/Constant'

class DoctorListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      iShow: false
    }
    //日期右侧过滤条件
    this.filterMore = ''
    this.filterItem = ''
  }

  render() {
    const { name } = this.props.match.params
    const { doctors, reservations, actionTabKey } = this.props
    console.log(reservations)
    return (
      <SafeAreaView showBar={true} title={name} isRight={false} handleBack={this.handleBack}>
        <DoctorTabs
          filters={reservations}
          filterMoreItem={this.filterMore}
          doChangeTab={key => this.dataFilterTab(key)}
          filterItemClick={i => this.doDoctorListFilter(i)}
          CalendarPaneliShow={() => this.setState({ iShow: true })}
        />
        <DoctorItem data={doctors} {...this.props.match.params} actionTabKey={actionTabKey} />
        <Calendar
          show={this.state.iShow}
          reservations={reservations}
          markDate={date => {
            this.markDate(date)
          }}
          onBack={() => this.setState({ iShow: false })}
        />
        <LoadingMask />
      </SafeAreaView>
    )
  }

  /**
   * 按日期预约tab选中 调用此方法
   */
  dataFilterTab(key) {
    const {
      match,
      reservations,
      doctorListActions: { loadDoctorList }
    } = this.props
    const { id } = match.params
    const date = formateTimeStep(this.filterItem != '' ? this.filterItem : reservations[0])
    loadDoctorList(id, key === DOCTORTABKAY.expert ? '' : date)
  }

  doDoctorListFilter(i) {
    const {
      match,
      doctorListActions: { loadDoctorList }
    } = this.props
    const { id } = match.params
    const date = formateTimeStep(i)
    loadDoctorList(id, date)
    this.filterItem = i
  }

  /**
   * MODAL日历:选择某天，然后关闭
   * 1：关闭Modal,
   * 2: 通过过滤条件，过滤数据
   * @param date
   */
  markDate(date) {
    const {
      match,
      doctorListActions: { loadDoctorList }
    } = this.props
    const { id } = match.params
    this.filterMore = getDate(date)
    this.setState({ iShow: false })
    loadDoctorList(id, date)
  }

  handleBack = () => {
    this.props.history.goBack()
  }

  componentDidMount() {
    const {
      history,
      doctorListActions: { loadDoctorList, loadFilterTabList }
    } = this.props
    const { id } = this.props.match.params
    if (history.action === 'PUSH') {
      loadDoctorList(id)
      loadFilterTabList(id)
    }
  }

  componentWillUnmount() {
    const {
      history,
      doctorListActions: { clearAllItems }
    } = this.props
    if (history.action === 'POP') {
      clearAllItems(() => {})
    }
  }
}

const mapStateToProps = state => {
  return {
    fetchingStatus: getFetchStatus(state),
    actionTabKey: getActionTabKey(state),
    doctors: getDoctorList(state),
    reservations: getReservationList(state),
    seeDate: getSeeDate(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doctorListActions: bindActionCreators(doctorListActions, dispatch),
    doctorTabsActions: bindActionCreators(doctorTabsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorListContainer)
