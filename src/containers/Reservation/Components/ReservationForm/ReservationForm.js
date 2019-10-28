/**
 * Class: ReservationForm
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *  预约信息-下半部分-表格
 */
import React, {Component} from 'react'
import 'antd-mobile/dist/antd-mobile.css';
import { Icon,ActionSheet} from 'antd-mobile';
import {IOSSwitch} from '@components/IOSSwitch/IOSSwitch'
import './style.less'
import {withRouter} from "react-router-dom";

// fix touch to scroll background page on iOS
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}




class ReservationForm extends Component {

    render() {
        const {payType, bindCards, diagnosis, switchInfo, diagName, medicalType} = this.props
        console.log(switchInfo)
        return (
            <div className={'reservationForm'}>
                <div className={'reservationForm__cell border-bottom'} onClick={() => this.rowClick(0)}>
                    <span className={'reservationForm__cell__title'}>就诊人</span>
                    {bindCards.map(item => {
                        if (item.def) {
                            return (
                                <span key={item.id} className={'reservationForm__cell__right__name'}>{item.name}</span>
                            )
                        }
                    })}
                    <span className={'reservationForm__cell__right__icon'}>
                        <Icon type={'right'}/>
                    </span>
                </div>
                <div className={'reservationForm__cell border-bottom'} onClick={() => this.rowClick(1)}>
                    <span className={'reservationForm__cell__title'}>初/复诊</span>
                    <span className={'reservationForm__cell__right__name'}>{diagnosis}</span>
                    <span className={'reservationForm__cell__right__icon'}>
                        <Icon type={'right'}/>
                    </span>
                </div>
                <div className={'reservationForm__cell border-bottom'} onClick={() => this.rowClick(2)}>
                    <span className={'reservationForm__cell__title'}>医疗类别</span>
                    {medicalType.map((item, index) => {
                        if (index === 0) {
                            return (
                                <span key={item.id}
                                      className={'reservationForm__cell__right__name'}>
                                {item.mdicaltype_name}
                                </span>
                            )
                        }
                    })}

                    {medicalType.length > 1
                        ?
                        <span className={'reservationForm__cell__right__icon'}>
                        <Icon type={'right'}/>
                    </span>
                        :
                        null

                    }

                </div>
                <div className={'reservationForm__cell border-bottom'}>
                    <span className={'reservationForm__cell__title'}>疾病信息</span>
                    <input className={'reservationForm__cell__right__name'}
                           placeholder={'尚未确诊'}
                           value={diagName}
                           onChange={(e) => this.diagNameOnChange(e)}/>
                </div>
                <div className={'reservationForm__cell border-bottom'}>
                    <span className={'reservationForm__cell__title'}>{payType.switchTxt}</span>
                    {switchInfo.showSwitch
                        ?
                        <div style={{flex: 1, justifyContent: 'flex-end', display: 'flex'}}>
                            <IOSSwitch
                                // disabled = {true}
                                checked={switchInfo.defChecked}
                                onChange={() => this.handleIOSSwitch(switchInfo)}
                            />
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        )
    }

    rowClick(target) {
        const {refreshPage,history,reservationActions:{setDiagnosisName}} = this.props
        switch (target) {
            case 0: //切换家庭成员
                refreshPage()
                let path = {
                    pathname: 'bindCardList',
                    state: this.props.bindCards,
                    callBack: (data) => this.callBack(data) //此回调目前没什么用
                }
                history.push(path)
                return
            case 1:
                const BUTTONS = ['初诊', '复诊', '取消'];
                ActionSheet.showActionSheetWithOptions({
                        options: BUTTONS,
                        maskClosable: true,
                    },
                    (buttonIndex) => {
                        if (buttonIndex === -1) {
                            return
                        } else if (buttonIndex !== 2) {
                            setDiagnosisName(BUTTONS[buttonIndex])
                        }
                    });

            case 2:
                return
            default:
                return
        }
    }


    diagNameOnChange(e) {
        const {reservationActions:{setDiagName}} = this.props
        setDiagName(e.target.value)
    }

    handleIOSSwitch(switchInfo) {
        const {reservationActions:{setSwitchChecked}} = this.props
        if (!switchInfo.canChecked) {
            return
        }
        let data = {showSwitch: switchInfo.showSwitch, defChecked: switchInfo.defChecked, checked: !switchInfo.checked}
        setSwitchChecked(data)
    }

    /**
     * 切换家庭成员之后，会调用此方法 目前没什么用
     */
    callBack(){

    }
}


export default withRouter(ReservationForm)
