/**
 * Class: Title
 * Author: wufei
 * Date: 2019/6/25
 * Description:
 *
 */
import React, {Component} from 'react'
import './style.less'

export default class DoctorTitle extends Component {
    render() {
        return (
            <div className={'title__con'}>
                <div className={'title__avatar'}>
                    <div className={'title__avatar_txt'}>
                        琴
                    </div>
                </div>
                <div className={'title_desc'}>
                    <div className={'title__name'}>曹海琴</div>
                    <div className={'title__jobTitle___address'}>主人医师</div>
                    <div className={'title__jobTitle___address'}>南通市第二人民医院 儿科门诊</div>
                </div>
            </div>
        )
    }
}    
