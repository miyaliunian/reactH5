/**
 * Class: item
 * Author: wufei
 * Date: 2019/6/12
 * Description:
 *   每一项
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ico_user from '@assets/images/Home/ico_user.png'
import { Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import './style.less'

class BindCardItem extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    callBack: PropTypes.func
  }

  render() {
    const { data } = this.props
    return (
      <div className={'bindCard__list border-bottom'} onClick={() => this.navPage(data)}>
        <div className={'bindCard__left'}>
          {data.length > 0 ? (
            <div
              style={{
                flexDirection: 'row',
                display: 'flex',
                flex: 1,
                alignItems: 'center'
              }}>
              <img src={ico_user} className={'bindCard__icon'} />
              {data.map(item => {
                if (item.isSel) {
                  return <div key={item.id}>{item.name}</div>
                }
              })}
            </div>
          ) : (
            <div
              style={{
                flexDirection: 'row',
                display: 'flex',
                flex: 1,
                alignItems: 'center'
              }}>
              <img src={ico_user} className={'bindCard__icon'} />
              <span>请选择家庭成员</span>
            </div>
          )}
        </div>

        <div>
          <Icon type="right" color={'#007FFE'} />
        </div>
      </div>
    )
  }

  navPage(data) {
    let path = {
      pathname: 'bindCardList',
      callBack: data => this.callBack(data)
    }
    this.props.history.push(path)
  }

  callBack(data) {
    if (this.props.callBack && typeof this.props.callBack === 'function') {
      this.props.callBack(data)
    }
  }
}

export default withRouter(BindCardItem)
