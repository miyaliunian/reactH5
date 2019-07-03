/**
 * Class: BindCardItem
 * Author: wufei
 * Date: 2019/6/12
 * Description:
 *    卡绑定列表
 */
import React, {Component} from 'react'
import './style.less'
import Header from "@components/Header/NavBar";
import ico_man from '@images/Home/ico_man.png'
import avatar_man from '@images/Home/pic_man.png'
import ico_wman from '@images/Home/ico_wman.png'
import avatar_wman from '@images/Home/pic_wman.png'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as bindCardActions} from "@reduxs/modules/bindCard";


class BindCardList extends Component {
    handleBack = () => {
        this.props.history.goBack()
    }

    render() {
        const {state} = this.props.location
        return (
            <div className={'bindCardList'}>
                <Header title={'成员信息'} isRight={false} onBack={this.handleBack}/>
                {state.map(item => {
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
            </div>
        )
    }

    handleItemClick(cliItem) {
        const {state} = this.props.location
        state.map((item) => {
            if (item.id === cliItem.id) {
                item.def = true
            } else {
                item.def = false
            }
        })
        this.props.bindCardActions.setBindCard(state)
        this.props.history.goBack()
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        bindCardActions: bindActionCreators(bindCardActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BindCardList)
