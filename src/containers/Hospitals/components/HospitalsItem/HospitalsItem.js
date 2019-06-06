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
import RefreshFooter from "@components/Refresh/Footer/RefreshFooter";
import RefreshHeader from "@components/Refresh/Header/RefreshHeader";
//图标
import icon_sj from '@images/Home/三甲图标IOS.png';
import icon_bg from '@images/Home/报告图标IOS.png';
import icon_zh from '@images/Home/综合图标IOS.png';
import icon_yy from '@images/Home/预约图标IOS.png';

class HospitalsItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowRefreshHeader: false
        }
    }

    componentDidMount() {
        this.bscroll = new Bscroll(this.refs.hospitalsItem, {
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
        this.bscroll.on('pullingUp', this.props.pullingUpHandler);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLastPage) {
            this.bscroll.finishPullUp()
        }
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
        const {data, isLastPage} = this.props
        return (
            <div className={'hospitalsItem'} ref={'hospitalsItem'}>
                <div>
                    {this.state.isShowRefreshHeader
                        ?
                        <RefreshHeader/>
                        :
                        <div/>
                    }
                    {data.map((item, index) => {
                        return (<div className="hospitalsItem__con" key={index} onClick={() => this.navPage(item)}>
                            <div className="hospitalsItem__title">{item.name}</div>
                            <div className="hospitalsItem__middle">

                                <div className={'hospitalsItem__middle__item'}>
                                    <img src={icon_sj} className={'hospitalsItem__middle__icon'} alt=''/>
                                    <span className={'hospitalsItem__middle__innerTxt'}>{item.hosGradeShortName}</span>
                                </div>

                                <div className={'hospitalsItem__middle__item'}>
                                    <img src={icon_zh} className={'hospitalsItem__middle__icon'} alt=''/>
                                    <span className={'hospitalsItem__middle__innerTxt'}>{item.hosCategory}</span>
                                </div>

                                {item.regOpened
                                    ?
                                    <div className={'hospitalsItem__middle__item'}>
                                        <img src={icon_yy} className={'hospitalsItem__middle__icon'} alt=''/>
                                        <span className={'hospitalsItem__middle__innerTxt'}>可预约</span>
                                    </div>

                                    :
                                    null
                                }

                                {item.reportOpened
                                    ?
                                    <div className={'hospitalsItem__middle__item'}>
                                        <img src={icon_bg} className={'hospitalsItem__middle__icon'} alt=''/>
                                        <span className={'hospitalsItem__middle__innerTxt'}>查报告</span>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <div className="hospitalsItem__bottom">地址：{item.fullAddress}</div>
                        </div>)
                    })}
                    <RefreshFooter refreshStatus={isLastPage}/>
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

    pullingDownHandler = () => {
        this.setState({
            isShowRefreshHeader: true
        })
        this.props.pullingDownHandler()
    }
}

export default withRouter(HospitalsItem)