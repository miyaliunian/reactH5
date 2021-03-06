/**
 * Class: CategoryHosList
 * Author: wufei
 * Date: 2019/8/13
 * Description:
 * 选择医院
 */
import React, { Component } from 'react'
import Header from '@components/NavBar/NavBar'
import PropTypes from 'prop-types'
import Scroll from '@baseUI/ScrollView/scroll'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getFetchingStatus,
  getReservationHospitalizationList,
  getAllHospitalizationList,
  actions as chooseCategoryHospListActions
} from '@reduxs/modules/categoryHospList'

import './style.less'
import LoadingMask from '@components/Loading/LoadingMask'

class CategoryHosList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hospitalList: []
    }
  }
  static propTypes = {
    bindCardList: PropTypes.array,
    callBack: PropTypes.func.isRequired,
    onNavBack: PropTypes.func.isRequired
  }

  render() {
    const { appointmentHos, allHos, onNavBack } = this.props
    return (
      <div>
        <Header title={'选择医院'} isRight={false} onBack={() => onNavBack()} />
        <div className={'hospitalizationList'}>
          <Scroll
            pullDownRefresh
            doPullDownFresh={this.pullDownFreshAction}
            pullUpLoad
            pullUpLoadMoreData={this.loadMoreData}
            click={true}
            isLastPgae={false}  //是不是最后一页
            emptyTxt={'空文本描述'} //空文本描述
            data={[]} //要遍历的数据
            isPullUpTipHide={false}>
            <ul className={'hospitalizationList_content'}>
              <li>
                <div className={'hospitalizationList_header border-bottom'}>
                  <span style={{ fontSize: 13, fontWeight: 'bold' }}>最近预约的医院</span>
                </div>
                <ul className={'hospitalizationList_body'}>
                  {appointmentHos.map((item, index) => {
                    return (
                      <li
                        className={'hospitalizationItem_row border-bottom'}
                        key={item.id}
                        onClick={() => this.navGoBack(item)}>
                        <span style={{ fontSize: 13 }}>{item.name}</span>
                      </li>
                    )
                  })}
                </ul>
                <div className={'hospitalizationList_header border-bottom'}>
                  <span style={{ fontSize: 13, fontWeight: 'bold' }}>医院列表</span>
                </div>
                <ul className={'hospitalizationList_body'}>
                  {allHos.map((item, index) => {
                    return (
                      <li
                        className={'hospitalizationItem_row border-bottom'}
                        key={item.id}
                        onClick={() => this.navGoBack(item)}>
                        <span style={{ fontSize: 13 }}>{item.name}</span>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </Scroll>
        </div>
        <LoadingMask />
      </div>
    )
  }
  componentDidMount() {
    const {
      bindCardList,
      chooseCategoryHospListActions: { initCategaryHospitalList }
    } = this.props
    if (bindCardList) {
      let bindCardObj = bindCardList.filter(item => item.def)
      initCategaryHospitalList('inPrePay', bindCardObj[0], 1)
    }
  }

  pullDownFreshAction = () => {
    const {
      bindCardList,
      chooseCategoryHospListActions: { pullDownRefresh }
    } = this.props
    if (bindCardList) {
      let bindCardObj = bindCardList.filter(item => item.def)

      return new Promise((resolve, reject) => {
        pullDownRefresh('inPrePay', bindCardObj[0]).then(status => {
          if (status && status === 'success') {
            resolve()
          }
        })
      })
    }
  }

  loadMoreData = () => {
    const {
      chooseCategoryHospListActions: { loadMoreAction }
    } = this.props
    return new Promise(resolve => {
      loadMoreAction('inPrePay').then(status => {
        if (status && status === 'success') {
          resolve()
        }
      })
    })
  }

  navGoBack(data) {
    const { callBack } = this.props
    callBack(data)
  }
}

const mapStateToProps = state => {
  return {
    fetchingStatus: getFetchingStatus(state),
    appointmentHos: getReservationHospitalizationList(state),
    allHos: getAllHospitalizationList(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    chooseCategoryHospListActions: bindActionCreators(chooseCategoryHospListActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryHosList)
