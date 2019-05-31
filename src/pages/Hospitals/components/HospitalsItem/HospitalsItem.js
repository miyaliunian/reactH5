/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 *
 */
import React, {Component} from 'react'
import Bscroll from 'better-scroll'
import './style.less'

export default class HospitalsItem extends Component {

    componentDidMount() {
        this.scroll = new Bscroll(this.refs.hospitalsItem, {
            scrollY: true,
            click: true
        })
    }

    render() {
        const {data} = this.props
        return (
            <div className={'hospitalsItem'} ref={'hospitalsItem'}>
                <div>
                    {data.map((item, index) => {
                        return (<div className="hospitalsItem__con" key={index} onClick={() => {
                            alert(JSON.stringify(item))
                        }}>
                            <div className="hospitalsItem__title">{item.name}</div>
                            <div className="hospitalsItem__middle">
                                <span className={'hospitalsItem__innerTxt'}>{item.hosGradeShortName}</span>
                                <span className={'hospitalsItem__innerTxt'}>{item.hosCategory}</span>
                                {item.regOpened
                                    ?
                                    <span className={'hospitalsItem__innerTxt'}>可预约</span>
                                    :
                                    null
                                }

                                {item.reportOpened
                                    ?
                                    <span className={'hospitalsItem__innerTxt'}>查报告</span>
                                    :
                                    null
                                }
                            </div>
                            <div className="hospitalsItem__bottom">地址：{item.fullAddress}</div>
                        </div>)
                    })}
                </div>
            </div>
        )
    }
}

