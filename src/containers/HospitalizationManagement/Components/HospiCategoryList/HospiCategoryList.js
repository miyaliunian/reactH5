/**
 * Class: HospiCategoryList
 * Author: wufei
 * Date: 2019/8/13
 * Description:
 *
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import Scroll from 'react-bscroll'
import 'react-bscroll/lib/react-scroll.css'
import './style.less'

export default class HospiCategoryList extends Component<Props> {
    render() {
        const {reservationList, allList, onNavBack} = this.props
        return (
            <div>
                <Header title={'选择医院'} isRight={false} onBack={() => onNavBack()}/>
                <div className={'hospitalizationList'}>
                    <Scroll
                        pullDownRefresh
                        doPullDownFresh={this.pullDownFreshAction}
                        pullUpLoad
                        pullUpLoadMoreData={this.loadMoreData}
                        click={true}
                        isPullUpTipHide={ false }
                    >
                        <ul className={'hospitalizationList_content'}>
                            <li>
                                <div className={'hospitalizationList_header border-bottom'}>
                                    <span style={{fontSize: 13, fontWeight: 'bold'}}>最近预约的医院</span>
                                </div>
                                <div className={'hospitalizationList_body'}>
                                    {reservationList.map((item, index) => {
                                        return (
                                            <div className={'hospitalizationItem_row border-bottom'} key={item.id}
                                                 onClick={() => this.navGoBack(item)}>
                                                <span style={{fontSize: 13}}>{item.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className={'hospitalizationList_header border-bottom'}>
                                    <span style={{fontSize: 13, fontWeight: 'bold'}}>医院列表</span>
                                </div>
                                <div className={'hospitalizationList_body'}>
                                    {allList.map((item, index) => {
                                        return (
                                            <div className={'hospitalizationItem_row border-bottom'} key={item.id}
                                                 onClick={() => this.navGoBack(item)}>
                                                <span style={{fontSize: 13}}>{item.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </li>
                        </ul>
                    </Scroll>
                </div>
            </div>
        )
    }


    componentDidMount() {
        this.props.loadAllCategaryHospitalList()
    }


    pullDownFreshAction = () => {
        return new Promise((resolve) => {
            this.timer = setTimeout(() => {
                resolve()
            }, 400)
        })
    }

    loadMoreData = () => {
        // 更新数据
        return new Promise( resolve => {
            console.log('pulling up and load data')
            this.timer = setTimeout(() => {
                resolve()
            }, 1000)
        })
    }

    navGoBack(data) {
        const {callBack} = this.props
        callBack(data)
    }
}



