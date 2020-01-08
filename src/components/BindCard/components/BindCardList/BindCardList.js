/**
 * Class: BindCardItem
 * Author: wufei
 * Date: 2019/6/12
 * Description:
 *    卡绑定列表
 */
import React, { Component } from 'react'
import SafeAreaView from '@baseUI/SafeAreaView/SafeAreaView'
import LoadingMask from '@components/Loading/LoadingMask'
// 图标
import ico_man from '@assets/images/Home/ico_man.png'
import avatar_man from '@assets/images/Home/pic_man.png'
import ico_wman from '@assets/images/Home/ico_wman.png'
import avatar_wman from '@assets/images/Home/pic_wman.png'
// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as bindCardActions, getBindCardList } from '@reduxs/modules/bindCard'

// 样式
import './style.less'
class BindCardList extends Component {
  handleBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { bindCardList } = this.props
    return (
      <SafeAreaView showBar={true} title={'成员信息'} isRight={false} handleBack={this.handleBack}>
        <div className={'bindCardList'}>
          {bindCardList.map(item => {
            return (
              <div className={'bindCardList__con'} key={item.id} onClick={() => this.handleItemClick(item)}>
                <div className={'bindCardList__left'}>
                  <img src={item.sex === '男' ? avatar_man : avatar_wman} className={'bindCardList__avatar'} />
                </div>
                <div className={'bindCardList__middle'}>
                  <div className={'bindCardList__middle__top'}>
                    <div className={'bindCardList__name'}>{item.name}</div>
                    <img src={item.sex === '男' ? ico_man : ico_wman} className={'bindCardList__middle__icon'} />
                    <div>{item.age}岁</div>
                  </div>
                  <div className={'bindCardList__middle__bottom'}>{item.siNo}</div>
                </div>
              </div>
            )
          })}
          <LoadingMask />
        </div>
      </SafeAreaView>
    )
  }

  componentDidMount() {
    const {
      bindCardActions: { loadList }
    } = this.props
    loadList()
  }

  handleItemClick(cliItem) {
    const {
      bindCardList,
      location: { callBack },
      history
    } = this.props
    //处理选中的家庭成员
    bindCardList.map(i => {
      if (i.id == cliItem.id) {
        i.isSel = true
      } else {
        i.isSel = !i.isSel
      }
    })
    if (callBack) {
      setTimeout(() => {
        //1：将选中的家庭成员 通过回调函数 传回给调用方
        this.props.location.callBack(cliItem)
        //2：切换家庭成员之后 回退到上一页
        history.goBack()
      }, 10)
    }
  }
}

const mapStateToProps = state => {
  return {
    bindCardList: getBindCardList(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    bindCardActions: bindActionCreators(bindCardActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BindCardList)
