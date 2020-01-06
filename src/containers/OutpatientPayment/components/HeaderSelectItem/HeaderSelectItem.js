/**
 * 门诊缴费列表页头部的选择项
 * By Cy 2020-01-02
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import './style.less'

class HeaderSelectItem extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    callBack: PropTypes.func
  }

  render() {
    const { data, title, txt, clickTxt, type } = this.props
    // console.group(this.props)
    return (
      <div className={'select_item__list'} onClick={() => this.navPage(data)}>
        <div className={'select_item'}>
          <div className={'select_item_left'}>
            <span className={'select_item_title'}>{title}:</span>
            <div className={'select_item_txt'}>{txt}</div>
          </div>
          <div className={'select_item_click_txt'}>{clickTxt}</div>
        </div>
        <div>
          <Icon type="right" color={'#007FFE'} />
        </div>
      </div>
    )
  }

  navPage(data) {
    let path = {
      pathname: 'outpatientPayment',
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

export default withRouter(HeaderSelectItem)
