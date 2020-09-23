/**
 * By WF 20191216
 * dlrs-test
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './style.less'
class DLRSContainer extends Component {
  render() {
    return (
      <div className={'tabsWrapper'}>
        <div className={'tab_item'}>全部区域</div>
        <div className={'tab_item'}>综合排序</div>
        <div className={'tab_item'}>筛选</div>
      </div>
    )
  }
  componentDidMount() {
    return
    const { history } = this.props
    console.log(this.props)
    // console.log(this.props.location.search)
    let access_token = this.getParam('access_token')
    console.log('access_token: ' + access_token)
    let username = this.getParam('username')
    console.log('username: ' + username)
    let phone = this.getParam('phone')
    console.log('phone: ' + phone)
    let idNumber = this.getParam('idNumber')
    console.log('idNumber: ' + idNumber)
    if (this.props.location.pathname) {
      let url = this.props.location.pathname + '?'
      url += 'access_token='
      url += access_token
      url += '&username='
      url += username
      url += '&phone='
      url += phone
      url += '&idNumber='
      url += idNumber
      console.log('转发目标地址： ' + url)
    }
  }

  getParam(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  }
}

export default withRouter(DLRSContainer)
