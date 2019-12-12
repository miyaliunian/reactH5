/**
 * By Cuiyong 20190708
 * 注册表单
 */
import React, { Component } from 'react'
// import 'antd-mobile/dist/antd-mobile.css'
import { Icon, ActionSheet } from 'antd-mobile'
import './style.less'
import { Modal } from 'antd-mobile'
/**
 * 图标
 */
import icon_user from '@assets/images/Register/ico_yhm.png'
import icon_id from '@assets/images/Register/ico_sfz.png'
import icon_security_type from '@assets/images/Register/ico_canblx.png'
import icon_phone from '@assets/images/Register/ico_sjhm.png'
import icon_security_code from '@assets/images/Register/ico_dxyzm.png'
import icon_password from '@assets/images/Register/ico_mm.png'

export default class RegisterForm extends Component {
  render() {
    const { onChange, siTypes, loadStatus } = this.props
    return (
      <div className={'registerForm'}>
        <div className={'registerForm__cell border-bottom'}>
          <img src={icon_user} alt="" className={'registerForm__middle__icon'} />
          <input
            className="registerForm__cell__right__name"
            name="r_userName"
            placeholder="请输入姓名"
            onChange={onChange}
          />
        </div>
        <div className={'registerForm__cell border-bottom'}>
          <img src={icon_id} alt="" className={'registerForm__middle__icon'} />
          <input
            className="registerForm__cell__right__name"
            name="r_userIdNumber"
            placeholder="请输入有效身份证号"
            onChange={onChange}
          />
        </div>
        <div className={'registerForm__cell border-bottom'} onClick={() => this.rowClick(0)}>
          <img src={icon_security_type} alt="" className={'registerForm__middle__icon'} />
          <span className={'registerForm__cell__right__name'}>{siTypes[0]}</span>
          <span className={'registerForm__cell__right__icon'}>
            <Icon type={'right'} />
          </span>
        </div>
        <div className={'registerForm__cell border-bottom'}>
          <img src={icon_phone} alt="" className={'registerForm__middle__icon'} />
          <input
            className="registerForm__cell__right__name"
            name="r_cellphoneNumber"
            placeholder="请输入手机号码"
            onChange={onChange}
          />
          <div
            className={'registerForm__security_code'}
            onClick={() => {
              this.rowClick(1)
            }}>
            <span className={'registerForm__security_code_btn border'}>获取验证码</span>
          </div>
        </div>
        <div className={'registerForm__cell border-bottom'}>
          <img src={icon_security_code} alt="" className={'registerForm__middle__icon'} />
          <input
            className="registerForm__cell__right__name"
            name="r_securityCode"
            placeholder="请输入手机验证码"
            onChange={onChange}
          />
        </div>
        <div className={'registerForm__cell border-bottom'}>
          <img src={icon_password} alt="" className={'registerForm__middle__icon'} />
          <input
            type="password"
            className="registerForm__cell__right__name"
            name="r_password"
            placeholder="请输入登录密码(6-15位字母+数字)"
            onChange={onChange}
          />
        </div>
        <div className={'registerForm__cell border-bottom'}>
          <img src={icon_password} alt="" className={'registerForm__middle__icon'} />
          <input
            type="password"
            className="registerForm__cell__right__name"
            name="r_passwordRepeat"
            placeholder="再次输入登录密码"
            onChange={onChange}
          />
        </div>
        <div className={'registerForm__btnContainer'}>
          <button className={'registerForm__btn'} onClick={() => this.rowClick(2)}>
            {'注册'}
          </button>
        </div>
        <div className={'info'}>
          注册意味着表示您已经阅读并同意
          <a href="https://www.ntyibao.com/t-core/license/license.htm">
            <span>用户协议>></span>
          </a>{' '}
        </div>
      </div>
    )
  }

  rowClick(target) {
    const { registerActions, siTypes, siMap, r_cellphoneNumber } = this.props
    console.log('siTypes: ' + JSON.stringify(siTypes))
    console.log('siMap: ' + JSON.stringify(siMap.size))

    console.log('siMap valie: ' + siMap.get('南通医保'))
    let length = siTypes.length
    switch (target) {
      case 0:
        const BUTTONS = siTypes
        ActionSheet.showActionSheetWithOptions(
          {
            options: BUTTONS,
            maskClosable: true
            // 'data-seed': 'logId',
          },
          buttonIndex => {
            console.log('BUTTONS[buttonIndex]: ' + BUTTONS[buttonIndex])
            if (buttonIndex === -1) {
              return
            } else if (buttonIndex !== length - 1) {
              console.log('siMap.get(BUTTONS[buttonIndex]):' + siMap.get(BUTTONS[buttonIndex]))
              this.props.registerActions.setSecurityType(siMap.get(BUTTONS[buttonIndex]))
            }
          }
        )
        return
      case 1:
        if (registerActions.checkCellphoneNumber()) {
          const alert = Modal.alert
          const showAlert = () => {
            const alertInstance = alert('获取短信验证码', '我们将发送短信验证码到这个号码: ' + r_cellphoneNumber, [
              {
                text: '取消',
                onPress: () => console.log('cancel'),
                style: 'default'
              },
              {
                text: '确定',
                onPress: () => registerActions.sendSmsMessage()
              }
            ])
            setTimeout(() => {
              // 可以调用close方法以在外部close
              console.log('auto close')
              alertInstance.close()
            }, 500000)
          }
          showAlert()
          // console.log("result: "+JSON.stringify(registerActions.sendSmsMessage()));
        }
        return
      case 2:
        console.log(registerActions.checkPageParams())
        if (registerActions.checkPageParams()) {
          registerActions.registerUser()
        }
        return
      case 3:
        registerActions.registerUser()
        return
      default:
        return
    }
  }
}
