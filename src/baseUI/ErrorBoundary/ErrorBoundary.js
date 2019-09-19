import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.less'

export default class ErrorBoundary extends React.Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    }

    state = {
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-wrapper">
                    <div className="error-title">页面出错了</div>
                    <a className="error-link" href="/">回到首页</a>
                </div>
            )
        }

        return this.props.children
    }
}