/**
 * Class: DoctorDesc
 * Author: wufei
 * Date: 2019/6/25
 * Description:
 *
 */
import React, {Component} from 'react'
import './style.less'

export default class DoctorDesc extends Component {
    render() {
        return (
            <div className={'doctorDesc border-top'}>
                <div className={'doctorDesc__title'}>医生详情</div>
                <div className={'doctorDesc__info'}>
                    <div className={'doctorDesc__experience__goodAt'}>经历: 暂无</div>
                    <div className={'doctorDesc__experience__goodAt'}>擅长: 暂无</div>
                </div>
            </div>
        )
    }
}    
