
/**
 * 我的订单
 */
import React, { Component } from 'react'
import Header from '@components/NavBar/NavBar'
import MyOrderTabs from '@containers/MyOrder/components/Tabs/MyOrderTabs'
import LoadingMask from '@components/Loading/LoadingMask'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
import { connect } from 'react-redux'

//Redux
import { bindActionCreators } from 'redux'
import { actions as myOrderActions } from '@reduxs/modules/myOrderTabs'

//样式
import './style.less'

class MyOrderContainer extends Component {
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
    console.log('MyOrderContainer');
    console.group(this.props);
    return (
        <SafeAreaView showBar={true} title={'我的订单'} isRight={false} handleBack={this.handleBack}>
          <MyOrderTabs
              {...this.props}
              filterMoreItem={this.filterMore}
              doChangeTab={key => this.dataFilterTab(key)}
              filterItemClick={i => this.doDoctorListFilter(i)}
              CalendarPaneliShow={() => this.ishowCalendar()}
          />

          {/*<DoctorItem data={doctors} {...this.props.match.params} actionTabKey={actionTabKey} />*/}
          <LoadingMask />
        </SafeAreaView>
    )
  }

  /**
   * 按日期预约tab选中 调用此方法
   */
  dataFilterTab(key) {
    // const {
    //   match,
    //   reservations,
    //   doctorListActions: { loadDoctorList }
    // } = this.props
    // const { id } = match.params
    // const date = formateTimeStep(this.filterItem != '' ? this.filterItem : reservations[0])
    // loadDoctorList(id, key === DOCTORTABKAY.expert ? '' : date)
  }

  doDoctorListFilter(i) {
    // const {
    //   match,
    //   doctorListActions: { loadDoctorList }
    // } = this.props
    // const { id } = match.params
    // const date = formateTimeStep(i)
    // loadDoctorList(id, date)
    // this.filterItem = i
  }

  /**
   * MODAL日历:选择某天，然后关闭
   * 1：关闭Modal,
   * 2: 通过过滤条件，过滤数据
   * @param date
   */
  markDate(date) {
    // const {
    //   match,
    //   doctorListActions: { loadDoctorList }
    // } = this.props
    // const { id } = match.params
    // this.filterMore = getDate(date)
    // this.ishowCalendar()
    // loadDoctorList(id, date)
  }

  handleBack = () => {
    this.props.history.goBack()
  }

  /**
   * 日历:显示/隐藏
   */
  ishowCalendar() {
    this.setState({
      isShow: !this.state.isShow
    })
  }

  componentDidMount() {
    const {
      history
      // doctorListActions: { loadDoctorList, loadFilterTabList }
    } = this.props
    const { id } = this.props.match.params
    if (history.action === 'PUSH') {
      // loadDoctorList(id)
      // loadFilterTabList(id)
    }
  }

  componentWillUnmount() {
    // const {
    //   history,
    //   doctorListActions: { clearAllItems }
    // } = this.props
    // if (history.action === 'POP') {
    //   clearAllItems(() => {})
    // }
  }
}

const mapStateToProps = state => {
  return {
    // fetchingStatus: getFetchStatus(state),
    // actionTabKey: getActionTabKey(state),
    // doctors: getDoctorList(state),
    // reservations: getReservationList(state),
    // seeDate: getSeeDate(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // doctorListActions: bindActionCreators(doctorListActions, dispatch),
    doctorTabsActions: bindActionCreators(myOrderActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrderContainer)
