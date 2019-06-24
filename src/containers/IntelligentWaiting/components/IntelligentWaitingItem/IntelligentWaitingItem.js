/**
 * Class:
 * Author: liu-h
 * Date: 2019/6/21
 * Description:
 *
 */
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Bscroll from 'better-scroll'
import './style.less'
import {withRouter} from 'react-router-dom'
// import RefreshFooter from "@components/Refresh/Footer/RefreshFooter";
import RefreshHeader from "@components/Refresh/Header/RefreshHeader";

class IntelligentWaitingItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowRefreshHeader: false
        }
    }

    componentDidMount() {
        this.bscroll = new Bscroll(this.refs.IntelligentWaitingItem, {
            mouseWheel: true,
            probeType: 3,
            click: true,
            tap: true,
            pullDownRefresh: {
                threshold: 30,
                stop: 20
            },
            pullUpLoad: {
                threshold: 80
            },
            useTransition: false
        })
        this.bscroll.on('pullingDown', this.pullingDownHandler)
        // this.bscroll.on('pullingUp', this.props.pullingUpHandler);
    }

    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            if (!this.props.fetchingStatus) {
                this.setState({
                    isShowRefreshHeader: false
                })
                this.bscroll.finishPullDown()
            }
        }, 200)
    }
    render() {
        return (
            <div className={'intelligentWaitingItem'} ref={'intelligentWaitingItem'}>
                <div>
                    {this.state.isShowRefreshHeader
                        ?
                        <RefreshHeader/>
                        :
                        <div/>
                    }
                    {data.map((item, index) => {
                        return (
                                <div className="intelligentWaitingItem__con">
                                    <div className="hintelligentWaitingItem__title">{item.name}</div>
                                    <div className="intelligentWaitingItem__middle">
                                        <div className={'intelligentWaitingItem__middle__item'}>
                                            <img src={icon_sj} alt='' className={'intelligentWaitingItem__middle__icon'}/>
                                            <span
                                                className={'intelligentWaitingItem__middle__innerTxt'}>{item.hosGradeShortName}</span>
                                        </div>
                                        <div className={'intelligentWaitingItem__middle__item'}>
                                            <img src={icon_zh} alt='' className={'intelligentWaitingItem__middle__icon'}/>
                                            <span
                                                className={'intelligentWaitingItem__middle__innerTxt'}>{item.hosCategory}</span>
                                        </div>
                                        {item.regOpened
                                            ?
                                            <div className={'intelligentWaitingItem__middle__item'}>
                                                <img src={icon_yy} alt='/' className={'intelligentWaitingItem__middle__icon'}/>
                                                <span className={'intelligentWaitingItem__middle__innerTxt'}>可预约</span>
                                            </div>

                                            :
                                            null
                                        }
                                        {item.reportOpened
                                            ?
                                            <div className={'intelligentWaitingItem__middle__item'}>
                                                <img src={icon_bg} className={'intelligentWaitingItem__middle__icon'} alt=''/>
                                                <span className={'intelligentWaitingItem__middle__innerTxt'}>查报告</span>
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    <div className="intelligentWaitingItem__bottom">地址：{item.fullAddress}</div>
                                </div>
                        )
                    })}
                    <RefreshFooter refreshStatus={isLastPage}/>
                </div>
            </div>
        )
    }

    pullingDownHandler = () => {
        this.setState({
            isShowRefreshHeader: true
        })
        this.props.pullingDownHandler()
    }
}

export default withRouter(HospitalsItem)
