/**
 * Class: ReservationForm
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *  预约信息-下半部分-表格
 */
import React, {Component} from 'react'
import {Icon, ActionSheet} from 'antd-mobile'
import {IOSSwitch} from '@components/IOSSwitch/IOSSwitch'
import './style.less'
import {withRouter} from "react-router-dom";


class ReservationForm extends Component {

    render() {
        const {payType, bindCards, diagnosis, switchInfo, diagName, medicalType} = this.props
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
                                checked={switchInfo.checked}
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
        switch (target) {
            case 0:
                this.props.refreshPage()
                let path = {
                    pathname: 'bindCardList',
                    state: this.props.bindCards
                }
                this.props.history.push(path)
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
                            this.props.reservationActions.setDiagnosisName(BUTTONS[buttonIndex])
                        }
                    });

            case 2:
                return
            default:
                return
        }
    }


    diagNameOnChange(e) {
        this.props.reservationActions.setDiagName(e.target.value)
    }

    handleIOSSwitch(switchInfo) {
        if (!switchInfo.defChecked) {
            return
        }
        let data = {showSwitch: switchInfo.showSwitch, defChecked: switchInfo.defChecked, checked: !switchInfo.checked}
        this.props.reservationActions.setSwitchChecked(data)
    }
}


export default withRouter(ReservationForm)