/**
 * Class: PopUP
 * Author: wufei
 * Date: 2019/8/29
 * Description:
 *
 */
import React, {Component} from 'react'
import classNames from 'classnames'
import {Icon} from 'antd-mobile'
import CodeInput from "@components/CodeInput/CodeInput";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getPopupState, actions as popUpActions} from "@reduxs/modules/popUp";
import './style.less'
import {Content} from './style'


class PopUpContainer extends Component {
    render() {
        const {popupState, popUpActions} = this.props
        return (
            <div className={classNames({'popup-wrapper': true, active: popupState})}>
                <div className={classNames({content: true, active: popupState})}>
                    <Content>
                        <div className={'header border-bottom'}>
                            <Icon type={'cross'} style={{color:'black',position:'absolute',left:'10px'}} onClick={()=>popUpActions.hidePopup()}/>
                            <h4 className={'title'}>请输入社保卡密码</h4>
                        </div>

                        <div className={'header_body'}>
                            <p style={{margin: '10px 0', fontSize: '15px'}}>扫描购药</p>
                            <p style={{marginBottom: '10px', fontSize: '28px', fontWeight: 'bolder'}}>￥30.20</p>
                        </div>
                        <CodeInput/>
                    </Content>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        popupState: getPopupState(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        popUpActions: bindActionCreators(popUpActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUpContainer)