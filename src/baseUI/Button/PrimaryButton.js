/**
 * Class: ButtonWrapper
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *
 */
import React, {Component} from 'react'
import PropTypes from "prop-types";
import './style.less'

export default class PrimaryButton extends Component {

    static propTypes = {
        txt: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired
    }

    render() {
        const {txt, onSubmit} = this.props
        return (
            <div className={'form__btnContainer'}>
                <button className={'form__btn'} onClick={onSubmit}>{txt}</button>
            </div>
        )
    }
}

