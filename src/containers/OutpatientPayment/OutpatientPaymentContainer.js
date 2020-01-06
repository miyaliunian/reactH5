/**
 * 门诊缴费 By Cy 2020/01/02
 */
import React, { Component } from 'react'
import Header from '@components/NavBar/NavBar'
import './style.less'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actions as outpatientPaymentActions,
  getFamilyList,
  getDefaultPerson,
  getHospitalList,
  getFetchingStatus
} from '@reduxs/modules/outpatientPayment'
import HeaderSelectItem from './components/HeaderSelectItem/HeaderSelectItem'
import LoadingMask from '../../components/Loading/LoadingMask'

const IntelligentWaitingRefreshTime = {
  time: 60000 // 刷新时间一分钟，单位为毫秒
}

class OutpatientPaymentContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.bindCardList !== this.props.bindCardList) {
    //   let perObj = nextProps.bindCardList.filter(item => item.isSel)
    //   this.props.bindCardActions.loadingWaitingListByPerson(perObj[0])
    // }
  }
  handleBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { bindCardList, waitingList, fetchingStatus } = this.props
    return (
      <div
        id="intelligentWaitingContainer"
        onTouchMove={e => this.handleTouchMove(e)}
        className={'intelligentWaitingContainer'}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            leift: 0,
            right: 0,
            width: '100%',
            zIndex: '999'
          }}>
          <Header
            id="intelligentWaitingContainer__header"
            title={'门诊缴费'}
            onBack={this.handleBack}
            isRight={false}
          />
          {/*-------------------------选择成员信息*/}
          <HeaderSelectItem
            data={bindCardList}
            isRefresh={this.refresh}
            title={'就诊人'}
            clickTxt={'切换成员'}
            txt={'测试人员'}
            type={'person'}
            callBack={data => this.refreshCallBack(data)}
          />
          <HeaderSelectItem
            data={bindCardList}
            isRefresh={this.refresh}
            title={'就诊医院'}
            txt={'南通市第六人民医院'}
            type={'hospital'}
            callBack={data => this.refreshCallBack(data)}
          />
        </div>
        {fetchingStatus ? <LoadingMask /> : null}
      </div>
    )
  }

  // componentDidMount() {
  //   this.props.bindCardActions.loadWaitingList();
  //   // 定时器，可以修改IntelligentWaitingRefreshTime.time为自己想要的时间
  //   this.timer = setInterval(
  //     () => this.timeToRefresh(),
  //     IntelligentWaitingRefreshTime.time
  //   );
  // }
  componentDidMount() {
    this.props.outpatientPaymentActions.loadingHospitalListByPersonId()
    // let defaultPerson = this.props.defaultPerson
    // console.group(defaultPerson)
    // if (defaultPerson) {
    //   this.props.outpatientPaymentActions.loadingHospitalListByPersonId('recipe', defaultPerson.id)
    //   console.group(this.props.hospitalList)
    // }
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    // this.timer && clearTimeout(this.timer)
  }
  //下拉刷新
  pullingDownHandler() {
    this.getWaitingListByPerson()
  }

  //定时执行刷新
  timeToRefresh() {
    this.getWaitingListByPerson()
  }

  //重新选择家庭成员后重新刷新数据
  refreshCallBack(data) {
    const {
      bindCardActions: { loadingWaitingListByPerson }
    } = this.props
    loadingWaitingListByPerson(data)
  }

  handleTouchMove(event) {}
  //
}

const mapStateToProps = state => {
  return {
    familyList: getFamilyList(state),
    hospitalList: getHospitalList(state),
    fetchingStatus: getFetchingStatus(state),
    defaultPerson: getDefaultPerson(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    outpatientPaymentActions: bindActionCreators(outpatientPaymentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutpatientPaymentContainer)
