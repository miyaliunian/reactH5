/**
 * Class: ClinicContainer
 * Author: wufei
 * Date: 2019/5/31
 * Description:
 *    首页->医院列表->科室选择
 */
import React, {Component } from 'react'
import Header from '../../components/Header/NavBar'
import {Icon} from 'antd-mobile';
import Bscroll from 'better-scroll'
import './style.less'

const leftData = [
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
    {txt: '内外'},
]

export default class ClinicContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
        }

    }


    render() {
        return (
            <div className={'clinic'}>
                <Header title={'南通大学附属医院'} onBack={this.handleBack} isRight={false}/>
                <div className={'clinic__bar'}>
                    <div>进入医院主页</div>
                    <Icon className={'clinic__bar__icon'} type={'right'}/>
                </div>
                <div className={'clinic__container'}>
                    <div className={'clinic__left'} ref={'clinic__left'}>
                        <div>
                            {leftData.map((item,index) => {
                                return <div key={index} className={'clinic__left__item'} onClick={()=>alert(index)}>{item.txt}</div>
                            })}
                        </div>
                    </div>
                    <div className={'clinic__right'} ref={'clinic__right'}>
                        <div>
                            <div>
                                {leftData.map((item,index) => {
                                    return <div key={index} className={'clinic__right__item'} onClick={()=>alert(index)}>{item.txt}</div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    componentDidMount(){
        this.scroll = new Bscroll(this.refs.clinic__left,{
            scrollY: true,
            click: true
        })
        this.scroll = new Bscroll(this.refs.clinic__right,{
            scrollY: true,
            click: true
        })
    }


    handleBack = () => {
        this.props.history.goBack()
    }
}    
