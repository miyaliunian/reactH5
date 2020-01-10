import React, { Component } from 'react'
import ReactPullLoad, { STATS } from 'react-pullload'
import '@assets/less/ReactPullLoad.less'
export default class ScrollView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMore: true,
      action: STATS.init
    }
  }

  handleAction = action => {
    console.log(action)
    if (
      action === this.state.action ||
      (action === STATS.refreshing && this.state.action === STATS.loading) ||
      (action === STATS.loading && this.state.action === STATS.refreshing)
    ) {
      return false
    }

    if (action === STATS.refreshing) {
      //刷新
      this.props.refreshCallback(e => {
        console.log(e)
        this.setState({
          hasMore: true,
          action: STATS.refreshed
        })
      })
    } else if (action === STATS.loading  && this.state.hasMore) {
      const { iLastPage, loadCallback } = this.props
      if (!iLastPage) {
        loadCallback(e => {
          this.setState({
            action: STATS.reset,
            hasMore: false
          })
        })
      }
    }
    if (action === STATS.loading && !this.state.hasMore) {
      return
    }

    this.setState({
      action: action
    })
  }

  render() {
    const { hasMore } = this.state
    return (
      <div className={'scrollview'}>
        <ReactPullLoad
          downEnough={50}
          action={this.state.action}
          handleAction={this.handleAction}
          hasMore={hasMore}
          distanceBottom={50}>
          {this.props.children}
        </ReactPullLoad>
      </div>
    )
  }}
