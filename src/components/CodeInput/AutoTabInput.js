/**
 * Class: AutoTabInputContainer
 * Author: wufei
 * Date: 2019/8/29
 * Description:
 * 密码输入框组件、验证码输入框组件
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './style.less'

export default  class AutoTabInput extends PureComponent {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleTab = this.handleTab.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    // <!--防止获取焦点错误 延迟一下-->

    componentDidMount() {
        if (this.props.autoFocus) {
            setTimeout(() => {
                this._input.focus();
            }, 100)
        }
    }
    handleChange(e) {
        const input = e.target.value
        if (this.props.onChange) {
            this.props.onChange(input)
        }
        this.handleTab(e)
    }
    // <!--监听删除状态 这边实现的不是很好下次再改吧-->

    handleDelete(e) {
        const BACK_SPACE = 8
        const isBackSpaceKey = e.keyCode === BACK_SPACE
        if (isBackSpaceKey && e.target.value.length === 0) {
            let previous = e.target
            previous = previous.previousElementSibling
            while (previous) {
                if (previous === null) break
                if (previous.tagName.toLowerCase() === 'input') {
                    previous.focus()
                    break
                }
            }
        }
    }
    // <!--焦点变化-->
    handleTab(e) {
        const target = e.target
        const input = target.value
        if (input.length >= this.props.maxLength) {
            let next = target
            next = next.nextElementSibling
            while (next) {
                if (next === null) break
                if (next.tagName.toLowerCase() === 'input') {
                    next.focus()
                    break
                }
            }
        }
    }

    render() {
        return (
            <input
                className={'autoTabInput border-top'}
                type={this.props.type}
                name={this.props.name}
                placeholder={this.props.hint}
                maxLength={this.props.maxLength}
                defaultValue={this.props.value}
                onChange={this.handleChange}
                onKeyDown={this.props.maxLength ? this.handleDelete : null}
                // style={this.props.style}
                autoFocus={this.props.autoFocus}
                ref={(c) => this._input = c}
                value={this.props.value}
            />
        )
    }
}

AutoTabInput.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    hint: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxLength: PropTypes.number,
    style: PropTypes.object,
    autoFocus: PropTypes.bool,
}
