/**
 * Class: HospitalizationManagementContainer
 * Author: wufei
 * Date: 2019/8/13
 * Description:
 *
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import {Icon} from 'antd-mobile';
import './style.less'


export default class HospitalizationManagementContainer extends Component {
    render() {
        return (
            <div className={'hospitalizationManagement'}>
                <Header title={'住院服务'} isRight={false} onBack={this.handleBack}/>
                <div className={'hospitalizationManagement_bindCardItem border-bottom'} onClick={() => {
                }}>
                    <div className={'icon_bindCardItem'}/>
                    <span className={'icon_bindCardItem_text_Style'}>请选择家庭成员</span>
                    <Icon className={'clinic__bar__icon rightIcon_position'} type={'right'}/>
                </div>
                <div className={'hospitalizationManagement_hospitalization'} onClick={() => {
                }}>
                    <span className={'hospitalizationManagement_hospitalization_text_Style '}>就诊医院</span>
                    <div className={'hospitalization_right'}>
                        <span className={'hospitalization_right_text_Style'}>请选择医院</span>
                        <Icon className={'clinic__bar__icon'} type={'right'}/>
                    </div>
                </div>
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }
}    
