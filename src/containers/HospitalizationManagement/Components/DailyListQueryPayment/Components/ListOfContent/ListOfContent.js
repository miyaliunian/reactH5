/**
 * Class: ListOfContent
 * Author: wufei
 * Date: 2019-08-19
 * Description:
 *  一日清单列表
 */
import React, {Component} from 'react';
import './stlye.less'

export default class ListOfContent extends Component {

    state = {};

    render() {
        const {list} = this.props
        return (
            <div className={'listOfContent'}>
                <div className={'listOfContent_header border-bottom'}>
                    <div className={'listOfContent_name'}>
                        <span>项目名称</span>
                    </div>
                    <div className={'listOfContent_info'}>
                        <span className={'item'}>规格</span>
                        <span className={'item'}>数量</span>
                        <span className={'item'}>单价</span>
                        <span className={'item'}>金额</span>
                    </div>
                </div>

                {list.map((item, index) => {
                    return (
                        <div className={'listOfContent_header border-bottom'} key={index}>
                            <div className={'listOfContent_name'}>
                                <span>{item.itemName}</span>
                            </div>
                            <div className={'listOfContent_info'}>
                                <span className={'item'}>{item.space}</span>
                                <span className={'item'}>{item.qty}</span>
                                <span className={'item'}>{item.price}</span>
                                <span className={'item'}>{item.totCost}</span>
                            </div>
                        </div>)
                })}

            </div>

        );
    }
}


