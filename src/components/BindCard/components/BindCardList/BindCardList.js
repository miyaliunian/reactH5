/**
 * Class: BindCardItem
 * Author: wufei
 * Date: 2019/6/12
 * Description:
 *    卡绑定列表
 */
import React, {Component} from 'react'
import './style.less'
import ico_man from '@images/Home/ico_man.png'
import avatar_man from '@images/Home/pic_man.png'
import ico_wman from '@images/Home/ico_wman.png'
import avatar_wman from '@images/Home/pic_wman.png'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as bindCardActions,getBindCardList} from "@reduxs/modules/bindCard";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";
import LoadingMask from "@components/Loading/LoadingMask";


class BindCardList extends Component {
    handleBack = () => {
        this.props.history.goBack()
    }

    render() {
        const {bindCardList} = this.props
        return (
            <div className={'bindCardList'} >
                <SafeAreaView showBar={true} title={'成员信息'} isRight={false} handleBack={this.handleBack}>
                    {bindCardList.map(item => {
                        return (

                            <div className={'bindCardList__con'} key={item.id} onClick={() => this.handleItemClick(item)}>
                                <div className={'bindCardList__left'}>
                                    <img src={item.sex === '男' ? avatar_man : avatar_wman}
                                         className={'bindCardList__avatar'}/>
                                </div>
                                <div className={'bindCardList__middle'}>
                                    <div className={'bindCardList__middle__top'}>
                                        <div className={'bindCardList__name'}>
                                            {item.name}
                                        </div>
                                        <img src={item.sex === '男' ? ico_man : ico_wman}
                                             className={'bindCardList__middle__icon'}/>
                                        <div>
                                            {item.age}岁
                                        </div>
                                    </div>
                                    <div className={'bindCardList__middle__bottom'}>{item.siNo}</div>
                                </div>
                            </div>
                        )
                    })}
                    <LoadingMask/>
                </SafeAreaView>
            </div>
        )
    }


    componentDidMount() {
        const {bindCardActions:{loadList}} = this.props
        loadList()
    }

    handleItemClick(cliItem) {
        const {location:{callBack},history} = this.props
        if (callBack){
            //1：将选中的家庭成员 通过回调函数 传回给调用方
            this.props.location.callBack(cliItem)
            //2：切换家庭成员之后 回退到上一页
            history.goBack()
        }

    }
}

const mapStateToProps = (state) => {
    return {
        bindCardList:getBindCardList(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        bindCardActions: bindActionCreators(bindCardActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BindCardList)
