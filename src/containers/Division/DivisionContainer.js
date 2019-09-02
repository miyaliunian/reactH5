/**
 * Class: ClinicContainer
 * Author: wufei
 * Date: 2019/5/31
 * Description:
 *    首页->医院列表->科室选择
 */
import React, {Component} from 'react'
import Header from '@components/Header/NavBar'
import {Link} from 'react-router-dom'
import LoadingMask from "@components/Loading/LoadingMask";
import {Icon} from 'antd-mobile';
import Bscroll from 'better-scroll'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import './style.less'
import {
    actions as divisionActions,
    getFetchingStatus,
    getHostId,
    getDivisionList,
    getDepartmentList
} from "@reduxs/modules/division";
import SafeAreaView from "@baseUI/SafeAreaView/SafeAreaView";

class DivisionContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {}

    }

    render() {
        const {name} = this.props.match.params
        const {fetchingStatus, divisionList, departmentList} = this.props
        return (
            <div className={'clinic'} >
                <SafeAreaView showBar={true} title={name} isRight={false} handleBack={this.handleBack}>
                <div className={'clinic__bar border-bottom'}>
                    <div>进入医院主页</div>
                    <Icon className={'clinic__bar__icon'} type={'right'}/>
                </div>
                <div className={'clinic__container'}>
                    <div className={'clinic__left'} ref={'clinic__left'}>
                        <div>
                            {divisionList.map((item, index) => {
                                return <div key={index}
                                            className={item.isSel ? 'clinic__left__item border-bottom item_sel' : 'clinic__left__item border-bottom'}
                                            onClick={() => this.leftItemClick(item)}>{item.name}</div>
                            })}
                        </div>
                    </div>
                    <div className={'clinic__right'} ref={'clinic__right'}>
                        <div>
                            <div>
                                {departmentList.map((item) => {
                                    return (
                                        <Link to={`/doctorList/${item.id}/${item.name}`} key={item.id}>
                                            <div className={'clinic__right__item'}>{item.name}</div>
                                        </Link>
                                    )
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
                </SafeAreaView>
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
        const {id} = this.props.match.params
        this.props.divisionActions.loadDivisionList(id)
    }

    leftItemClick(item) {
        this.props.divisionList.map(oldItem => {
            if (oldItem.id === item.id) {
                oldItem.isSel = true
            } else {
                oldItem.isSel = false
            }
        })
        const {id} = this.props.match.params
        this.props.divisionActions.loadDepartmentListByHostId(id, item.id)
    }

    handleBack = () => {
        this.props.history.goBack()
    }

}


const mapStateToProps = (state) => {
    return {
        hosid: getHostId(state),
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