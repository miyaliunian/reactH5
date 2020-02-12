/**
 * 预约挂号详情 By Cy 2020/02/07
 */
import React, { Component } from 'react'
import './style.less'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoadingMask from '../../../../components/Loading/LoadingMask'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
import { actions as registerDetailActions, getDetail } from '@reduxs/modules/registerDetail'
import ico_clinic_pay_item from '@assets/images/OutpatientPayment/ico_clinic_pay_item.png'

const IntelligentWaitingRefreshTime = {
  time: 60000 // 刷新时间一分钟，单位为毫秒
}

class RegisterDetailContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btnChecked: true,
      detail: {}
    }
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
    const { detail } = this.props.location.state
    console.log('RegisterDetailContainer render this.props')
    console.group(this.props)
    return (
      <SafeAreaView showBar={true} title={'预约详情'} isRight={false} handleBack={this.handleBack}>
        <div className={'registerDetail-part1 border-topbottom'}>
          <div className={'registerDetail-part1-key'}>订单状态</div>
          <div className={'registerDetail-part1-value-blue'}>待支付（3天后就诊）</div>
        </div>
        <div className={'registerDetail-part2 border-bottom'}>
          <div className={'registerDetail-part2-item'}>
            <div className={'registerDetail-part2-item-key'}>就诊医院</div>
            <div className={'registerDetail-part2-item-value'}>{detail.hosName}</div>
          </div>
          <div className={'registerDetail-part2-item'}>
            <div className={'registerDetail-part2-item-key'}>就诊科室</div>
            <div className={'registerDetail-part2-item-value'}>{detail.deptName}</div>
          </div>
          <div className={'registerDetail-part2-item'}>
            <div className={'registerDetail-part2-item-key'}>就诊医生</div>
            <div className={'registerDetail-part2-item-value'}>{detail.doctName}</div>
          </div>
          <div className={'registerDetail-part2-item'}>
            <div className={'registerDetail-part2-item-key'}>就诊时间</div>
            <div className={'registerDetail-part2-item-value'}>{detail.seenDate}</div>
          </div>
          <div className={'registerDetail-part2-item'}>
            <div className={'registerDetail-part2-item-key'}>就诊序号</div>
            <div className={'registerDetail-part2-item-value'}>{detail.seeNo}</div>
          </div>
          <div className={'registerDetail-part2-item'}>
            <div className={'registerDetail-part2-item-key'}>门诊类型</div>
            <div className={'registerDetail-part2-item-value'}>{detail.reglevlName}</div>
          </div>
          <div className={'registerDetail-part2-item'}>
            <div className={'registerDetail-part2-item-key'}>挂号费用</div>
            <div className={'registerDetail-part2-item-value-money'}>￥{detail.regFee}</div>
          </div>
        </div>
        <div className={'registerDetail-distance'}></div>
        <div className={'registerDetail-part3 border-top'}>
          <div className={'registerDetail-part3-item border-bottom'}>
            <div className={'registerDetail-part3-item-key'}>就诊人</div>
            <div className={'registerDetail-part3-item-value'}>{detail.patientName}</div>
          </div>
          <div className={'registerDetail-part3-item border-bottom'}>
            <div className={'registerDetail-part3-item-key'}>初/复诊</div>
            <div className={'registerDetail-part3-item-value'}>{this.first2Str(detail.first)}</div>
          </div>
          <div className={'registerDetail-part3-item border-bottom'}>
            <div className={'registerDetail-part3-item-key'}>医疗类别</div>
            <div className={'registerDetail-part3-item-value'}>{detail.reglevlName}</div>
          </div>
          <div className={'registerDetail-part3-item border-bottom'}>
            <div className={'registerDetail-part3-item-key'}>疾病信息</div>
            <div className={'registerDetail-part3-item-value'}>{this.diseaseValuator(detail.diagName)}</div>
          </div>
        </div>
        <div className={'registerDetail-part4'}>
          <div className={'registerDetail-part4-title'}>
            <img src={ico_clinic_pay_item} className={'registerDetail-part4-title-img'} />
            <div className={'registerDetail-part4-title-txt'}>温馨提示 :</div>
          </div>
          <div className={'registerDetail-part4-content'}>
            请于2020年02月10日12:00-17:00至常州市第一人民医院二楼南D区就诊
          </div>
          <div className={'registerDetail-part4-content'}>
            挂号过程中如遇特殊情况不能正常就医，请按医院的相关管理流程执行。
          </div>
        </div>
        <div className={'registerDetail-part5'}>
          <div className={'registerDetail-part5-btn-box'} onClick={this.register2Pay()}>
            <div className={'registerDetail-part5-btn-core'}>支付</div>
          </div>
          <div className={'registerDetail-part5-btn-box'}>
            <div className={'registerDetail-part5-btn-core'}>取消预约</div>
          </div>
        </div>
        <div className={'registerDetail-part6'}>
          <div className={'registerDetail-part6-fee'}>
            <div className={'registerDetail-part6-fee-txt'}>费用总额：</div>
            <div className={'registerDetail-part6-fee-cost'}>{'￥' + detail.regFee}</div>
          </div>
        </div>
        <LoadingMask />
      </SafeAreaView>
    )
  }

  /**
   * 去支付
   */
  register2Pay() {
    const {
      registerDetailActions: { register2SiPrePay }
    } = this.props
    const { detail, defaultPerson, selHospital } = this.props.location.state
    register2SiPrePay(detail, defaultPerson, selHospital, { ...history })
  }

  // componentDidMount() {
  //   this.props.bindCardActions.loadWaitingList();
  //   // 定时器，可以修改IntelligentWaitingRefreshTime.time为自己想要的时间
  //   this.timer = setInterval(
  //     () => this.timeToRefresh(),
  //     IntelligentWaitingRefreshTime.time
  //   );
  // }
  paymentStatus2Str(status) {
    switch (status) {
      case 0:
        return '未支付'
      case 1:
        return '部分支付'
      case 2:
        return '已支付'
      case 3:
        return '已支付'
      case 4:
        return '部分退款'
      case 5:
        return '已退款'
      case 6:
        return '已退款'
      default:
        return '未知'
    }
  }
  first2Str(isFirst) {
    if (typeof isFirst == 'undefined') return '未知'
    if (isFirst) return '初诊'
    else return '复诊'
  }
  diseaseValuator(diseaseName) {
    if (diseaseName) return diseaseName
    else return '未知'
  }

  /**
   * 根据调解，生成part5按钮区域
   * @returns {*}
   */
  generatePart5() {
    const { detail } = this.props.location.state
    switch (detail.paymentStatus) {
      case 0: //未支付
      case 1: //部分支付
        return <div></div>
        break
    }
  }

  generatePaymentDetailLi(item) {
    return (
      <li className={'outpatientPaymentDetail-part2-item'}>
        <div className={'outpatientPaymentDetail-part2-item-txt'}>{item.itemName + 'x' + item.qty}</div>
        <div className={'outpatientPaymentDetail-part2-item-price'}>{'￥' + item.totCost}</div>
      </li>
    )
  }

  /**
   * 转向预结算页
   */
  gotoPreSiPay() {
    let path = {
      // pathname: "/advanceSettlementContainer",
      // state: {
      //     reservationName: typeEntity.name, //确认预约
      //     reservationCode: typeEntity.code, //确认预约
      //     reservationEntity: reservationEntity, //预约实体
      //     paymentMethod: reservationEntity.paymentMethod, //支付方式
      //     from: resObj.fromTarget
      // }
    }
  }

  componentDidMount() {
    const { history } = this.props
    // if (history.action === 'PUSH') {
    //     this.props.outpatientPaymentDetailActions.loadDetailById(outpatientPaymentId)
    // }
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    // this.timer && clearTimeout(this.timer)
  }

  //下拉刷新
  pullingDownHandler() {
    // this.getWaitingListByPerson()
  }

  //定时执行刷新
  timeToRefresh() {
    // this.getWaitingListByPerson()
  }

  handleTouchMove(event) {}

  //
}

const mapStateToProps = state => {
  return {
    detail: getDetail(state)
    // hospitalList: getHospitalList(state),
    // fetchingStatus: getFetchingStatus(state),
    // defaultPerson: getDefaultPerson(state),
    // recentHopsitalList: getRecentHospitalList(state),
    // selHospital: getSelHospital(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerDetailActions: bindActionCreators(registerDetailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDetailContainer)
