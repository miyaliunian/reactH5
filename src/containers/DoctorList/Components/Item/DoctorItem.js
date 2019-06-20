/**
 * Class: DoctorItem
 * Author: wufei
 * Date: 2019/6/18
 * Description:
 *  医生列表
 */
import React, {Component} from 'react'
import ico_doctor_status from '@images/Home/ico_doctor_status.png'
import ico_doctor_status_h from '@images/Home/ico_doctor_status_h.png'
import './style.less'

export default class DoctorItem extends Component {
    render() {
        const {data, tabSel} = this.props
        return (
            <div className={tabSel === 1 ? 'doctorItem' : 'doctorItem showCalendarBox'}>
                {data.map(item => {
                    return (
                        <div className={'doctorItem__item'} key={item.id}>
                            <div className={'doctorItem__avator'}>
                                {this.drawReact(item.name)}
                            </div>
                            <div className={'doctorItem__info'}>
                                <div className={'doctorItem__name_title'}>
                                    <div className={'doctorItem__name'}>{item.name}</div>
                                    <div className={'doctorItem__title'}>{item.title}</div>
                                </div>
                                <div
                                    className={'doctorItem__skills'}>
                                    擅长: {item.skills ? item.skills : '暂无'}
                                </div>
                            </div>
                            {
                                item.appoint
                                    ?
                                    (<div className={'doctorItem__right__icon'}>
                                            <img className={'doctorItem__icon'} src={ico_doctor_status_h}/>
                                        </div>
                                    )
                                    :
                                    (<div className={'doctorItem__right__icon'}>
                                            <img className={'doctorItem__icon'} src={ico_doctor_status}/>
                                        </div>
                                    )
                            }

                        </div>
                    )
                })}
            </div>
        )
    }

    drawReact(data) {
        let str = data[data.length - 1]
        return <div className={'avatar_txt'}>{str}</div>
    }
}    
