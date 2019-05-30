import React, {Component} from 'react'
import './style.less'

export default class ErrorToast extends Component {

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.clearError()
        }, 3000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render() {
        const {msg} = this.props
        return (
            <div className="errorToast">
                <div className="errorToast__text">
                    {msg}
                </div>
            </div>
        )
    }
}

