import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import './style.less'

export default class ErrorBoundary extends React.Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    }

    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="not-match-wrapper">
                    <div className="img-wrapper">
                        <img className="bg" src="https://b-gold-cdn.xitu.io/v3/static/img/bg.1f516b3.png" alt=""/>
                        <img className="panfish" src="https://b-gold-cdn.xitu.io/v3/static/img/panfish.9be67f5.png"
                             alt=""/>
                        <img className="sea" src="https://b-gold-cdn.xitu.io/v3/static/img/sea.892cf5d.png" alt=""/>
                        <img className="spray" src="https://b-gold-cdn.xitu.io/v3/static/img/spray.bc638d2.png" alt=""/>
                    </div>
                    <div className="link-wrapper">
                        <Link to="/" className="link">回到首页</Link>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}