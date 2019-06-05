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
import {withRouter} from 'react-router-dom'
import RefreshFooter from "../../../../components/Refresh/Footer/RefreshFooter";

class HospitalsItem extends Component {
    componentDidMount() {
        this.bscroll = new Bscroll(this.refs.hospitalsItem, {
            mouseWheel: true,
            probeType: 3,
            click: true,
            tap: true,
            pullDownRefresh: {
                threshold: 50,
                stop: 20
            },
            pullUpLoad: {
                threshold: 50
            }
        })
        this.bscroll.on('pullingDown', this.props.pullingDownHandler)
        this.bscroll.on('pullingUp', this.props.pullingUpHandler);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLastPage) {
            this.bscroll.finishPullUp()
        }
    }

    render() {
        const {data, isLastPage} = this.props
        return (
            <div className={'hospitalsItem'} ref={'hospitalsItem'}>
                <div>
                    {data.map((item, index) => {
                        return (<div className="hospitalsItem__con" key={index} onClick={() => this.navPage(item)}>
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
                    {isLastPage
                        ?
                        <RefreshFooter/>
                        :
                        <div/>
                    }

                </div>
            </div>
        )
    }

    navPage(item) {
        let data = item
        let path = {
            pathname: 'clinic',
            state: data
        }
        this.props.history.push(path)
    }
}

export default withRouter(HospitalsItem)