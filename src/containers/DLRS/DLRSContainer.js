/**
 * By Cuiyong 20191216
 * dlrs-test
 */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class DLRSContainer extends Component {
  render() {
    return <div />
  }
  componentDidMount() {
    const { history } = this.props
    console.log(this.props)
    // console.log(this.props.location.search)
    let param1 = this.getParam('param1')
    console.log('param1: ' + param1)
    let param2 = this.getParam('param2')
    console.log('param2: ' + param2)
    let param3 = this.getParam('param3')
    console.log('param3: ' + param3)
    let param4 = this.getParam('param4')
    console.log('param4: ' + param4)
    if (this.props.location.pathname) {
      let url = this.props.location.pathname + '?'
      url += 'param1='
      url += param1
      url += '&param2='
      url += 'param2'
      url += '&param3='
      url += 'param3'
      url += '&param4='
      url += 'param5'
      console.log('目标地址： ' + url)
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
