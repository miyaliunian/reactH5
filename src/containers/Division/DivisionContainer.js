/**
 * Class: ClinicContainer
 * Author: wufei
 * Date: 2019/5/31
 * Description:
 *    首页->医院列表->科室选择
 */
import React, {Component} from 'react'
import Header from '@components/Header/NavBar'
import LoadingMask from "@components/Loading/LoadingMask";
import {Icon} from 'antd-mobile';
import Bscroll from 'better-scroll'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import './style.less'
import {
    actions as divisionActions,
    getFetchingStatus,
    getDivisionList,
    getDepartmentList
} from "@reduxs/modules/division";

class DivisionContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
        }
    }

    render() {
        const {name} = this.props.location.state
        const {fetchingStatus, divisionList, departmentList} = this.props
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
                            {divisionList.map((item, index) => {
                                return <div key={index}
                                            className={item.isSel ? 'clinic__left__item item_sel' : 'clinic__left__item'}
                                            onClick={() => this.leftItemClick(item)}>{item.name}</div>
                            })}
                        </div>
                    </div>
                    <div className={'clinic__right'} ref={'clinic__right'}>
                        <div>
                            <div>
                                {departmentList.map((item, index) => {
                                    return <div key={index} className={'clinic__right__item'}
                                                onClick={() => alert(index)}>{item.name}</div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {fetchingStatus
                    ?
                    <LoadingMask/>
                    :
                    null
                }
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
        const {id} = this.props.location.state
        this.props.divisionActions.setHosid(id)
        this.props.divisionActions.loadDivisionList()
    }

    componentWillReceiveProps(nextProps) {
        const {divisionActions} = this.props
        if (nextProps.divisionList.length > 0) {
            if (this.props.divisionList.length !== nextProps.divisionList.length) {
                divisionActions.setDivisionid(nextProps.divisionList[0].id)
                divisionActions.loadDepartmentListByHostId()
            }
        }
    }

    leftItemClick(item) {
        this.props.divisionList.map(oldItem => {
            if (oldItem.id === item.id) {
                oldItem.isSel = true
            } else {
                oldItem.isSel = false
            }
        })
        this.props.divisionActions.setDivisionid(item.id)
        this.props.divisionActions.loadDepartmentListByHostId()
    }

    handleBack = () => {
        this.props.history.goBack()
    }

}


const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchingStatus(state),
        divisionList: getDivisionList(state),
        departmentList: getDepartmentList(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        divisionActions: bindActionCreators(divisionActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DivisionContainer)