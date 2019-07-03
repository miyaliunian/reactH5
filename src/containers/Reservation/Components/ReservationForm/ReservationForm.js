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
import BindCardContainer from '@components/BindCard/BindCardContainer'
import './style.less'


export default class ReservationForm extends Component {


    state = {
        switchChecked: false,
        clicked: '初诊',
    }

    render() {
        // console.log(this.props.medicalType)
        const {medicalType} = this.props
        return (
            <div className={'reservationForm'}>
                <div className={'reservationForm__cell border-bottom'}>
                    <span className={'reservationForm__cell__title'}>就诊人</span>
                    <div className={'reservationForm__bindCard'}>
                        <BindCardContainer showNavBar={false} rightArrowIcon={false} leftAvatar={false}/>
                    </div>
                    <span className={'reservationForm__cell__right__icon'}>
                        <Icon type={'right'}/>
                    </span>
                </div>
                <div className={'reservationForm__cell border-bottom'} onClick={() => this.rowClick(1)}>
                    <span className={'reservationForm__cell__title'}>初/复诊</span>
                    <span className={'reservationForm__cell__right__name'}>{this.state.clicked}</span>
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

                    <span className={'reservationForm__cell__right__name'}>尚未确诊</span>
                </div>
                <div className={'reservationForm__cell border-bottom'}>
                    <span className={'reservationForm__cell__title'}>使用医保支付</span>
                    <IOSSwitch
                        checked={this.state.switchChecked}
                        onChange={() => this.handleIOSSwitch(this.state.switchChecked)}
                        // value="checkedB"
                    />
                </div>
            </div>
        )
    }

    rowClick(target) {
        switch (target) {
            case 1:

                const BUTTONS = ['初诊', '复诊', '取消'];
                ActionSheet.showActionSheetWithOptions({
                        options: BUTTONS,
                        maskClosable: true,
                        // 'data-seed': 'logId',
                    },
                    (buttonIndex) => {
                        if (buttonIndex !== 2) {
                            this.setState({clicked: BUTTONS[buttonIndex]});
                        }
                    });

            case 2:
                return
            default:
                return
        }
    }


    handleIOSSwitch(target) {
        this.setState({
            switchChecked: !this.state.switchChecked
        })
    }
}    
