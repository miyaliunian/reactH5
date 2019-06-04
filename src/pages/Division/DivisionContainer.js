/**
 * Class: ClinicContainer
 * Author: wufei
 * Date: 2019/5/31
 * Description:
 *    首页->医院列表->科室选择
 */
import React, {Component} from 'react'
import Header from '../../components/Header/NavBar'
import {Icon} from 'antd-mobile';
import Bscroll from 'better-scroll'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import './style.less'
import {
    actions as divisionActions
} from "../../reduxs/modules/division";


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

class DivisionContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
        }
    }

    render() {
        console.log(this.props.location.state)
        const {name} = this.props.location.state
        return (
            <div className={'clinic'}>
                <Header title={name} onBack={this.handleBack} isRight={false}/>
                <div className={'clinic__bar'}>
                    <div>进入医院主页</div>
                    <Icon className={'clinic__bar__icon'} type={'right'}/>
                </div>
                <div className={'clinic__container'}>
                    <div className={'clinic__left'} ref={'clinic__left'}>
                        <div>
                            {leftData.map((item, index) => {
                                return <div key={index} className={'clinic__left__item'}
                                            onClick={() => alert(index)}>{item.txt}</div>
                            })}
                        </div>
                    </div>
                    <div className={'clinic__right'} ref={'clinic__right'}>
                        <div>
                            <div>
                                {leftData.map((item, index) => {
                                    return <div key={index} className={'clinic__right__item'}
                                                onClick={() => alert(index)}>{item.txt}</div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.scroll = new Bscroll(this.refs.clinic__left, {
            scrollY: true,
            click: true
        })
        this.scroll = new Bscroll(this.refs.clinic__right, {
            scrollY: true,
            click: true
        })
        this.props.divisionActions.loadDivisionList()
    }

    handleBack = () => {
        this.props.history.goBack()
    }

}


const mapStateToProps = (state) => {
    return {
        // hospitalList: getHospitalList(state),
        // fetchingStatus: getFetchingStatus(state),
        // isLastPage: getIsLastPage(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        divisionActions: bindActionCreators(divisionActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DivisionContainer)