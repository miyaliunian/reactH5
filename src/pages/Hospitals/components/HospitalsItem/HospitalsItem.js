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
import RefreshHeader from "../../../../components/Refresh/Header/RefreshHeader";

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
                threshold: 50
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
        setTimeout(() => {
            if (!this.props.fetchingStatus) {
                this.setState({
                    isShowRefreshHeader: false
                })
                this.bscroll.finishPullDown()
            }
        }, 500)

    }
}

export default withRouter(HospitalsItem)