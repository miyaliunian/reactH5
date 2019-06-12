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

export default class BindCardList extends Component {
    handleBack = () => {
        this.props.history.goBack()
    }

    render() {
        console.log(this.props)
        const {state} = this.props.location
        return (
            <div className={'bindCardList'}>
                <Header title={'成员信息'} isRight={false} onBack={this.handleBack}/>
                {state.map(item => {
                    return (
                        <div className={'bindCardList__con'}>
                            <div className={'bindCardList__left'}>
                                <img src={avatar_man} className={'bindCardList__avatar'}/>
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
                            {/*<div></div>*/}
                        </div>
                    )
                })}
            </div>
        )
    }
}    
