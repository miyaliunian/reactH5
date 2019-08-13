/**
 * Class: HospitalizationList
 * Author: wufei
 * Date: 2019/8/13
 * Description:
 *
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import Bscroll from 'better-scroll'
import './style.less'
export default class HospitalizationList extends Component {
    render() {
        const {onNavBack} = this.props
        return (
            <div>
                <Header title={'选择医院'} isRight={false} onBack={() => onNavBack()}/>
                <div className={'hospitalizationList'} ref={'hospitalizationListWrapper'}>
                    <div>
                        <div className={'hospitalizationList_header border-bottom'}>
                            <span style={{fontSize: 13, fontWeight: 'bold'}}>最近预约的医院</span>
                        </div>
                        <div className={'hospitalizationList_body'}>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                        </div>
                        <div className={'hospitalizationList_header border-bottom'}>
                            <span style={{fontSize: 13, fontWeight: 'bold'}}>最近预约的医院</span>
                        </div>
                        <div className={'hospitalizationList_body'}>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                            <div className={'hospitalizationItem_row border-bottom'}>
                                <span style={{fontSize: 13}}>南通市第六人民医院</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    componentDidMount() {
        this.bscroll = new Bscroll(this.refs.hospitalizationListWrapper, {
            mouseWheel: true,
            probeType: 3,
            click: true,
            tap: true,
            pullDownRefresh: {
                threshold: 30,
                stop: 50
            },
            pullUpLoad: {
                threshold: 80
            },
            useTransition: false
        })
        this.bscroll.on('pullingDown', this.pullingDownHandler)
    }


    pullingDownHandler=()=>{
        setTimeout(()=>{
            this.bscroll.finishPullDown()
        },1500)
    }
}    
