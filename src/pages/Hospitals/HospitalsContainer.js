/**
 * Class:
 * Author: wufei
 * Date: 2019/5/24
 * Description:
 *              医院列表容器
 */
import React, {PureComponent} from 'react'
import Header from "../../components/Header/NavBar";
import HospitalsItem from "./components/HospitalsItem/HospitalsItem";
import Tabs from "./components/Tabs/Tabs";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    actions as hospitalActions,
    getHospitalList,
    getFetchingStatus,
    getIsLastPage
} from '../../reduxs/modules/hospital'
import './style.less'
import LoadingMask from "../../components/Loading/LoadingMask";

class HospitalsContainer extends PureComponent {

    render() {
        const {fetchingStatus, isLastPage} = this.props
        return (
            <div
                id='hospitalsContainer'
                onTouchMove={(e)=>this.handleTouchMove(e)}
                className={'hospitalsContainer'}>
                <Header title={'医院列表'} onBack={this.handleBack} isRight={true}/>
                <Tabs
                    handelTabRowSel={(item, index) => this.handelTabRowSel(item, index)}
                    handelTabItemSel={(item) => this.handelTabItemSel(item)}
                />
                <HospitalsItem data={this.props.hospitalList} isLastPage={isLastPage}/>
                {fetchingStatus
                    ?
                    <LoadingMask/>
                    :
                    null
                }
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    handleTouchMove(event){
    }

    componentDidMount() {
        document.getElementById('hospitalsContainer').addEventListener("touchmove", (event) => {
            // 执行滚动回调
            event.preventDefault();
        }, {
            passive: false //  禁止 passive 效果
        })

        this.props.hospitalActions.loadHosipitalList()

    }

    componentWillUnmount(){
    }
    //处理行选中
    handelTabRowSel(item, index) {
        if (index === 1) { // 区域
            this.props.hospitalActions.setAreaId(item.code)
        } else { // 综合排序
            this.props.hospitalActions.setSord(item.value)
        }
        this.props.hospitalActions.loadHosipitalList()
    }
    //处理列选中
    handelTabItemSel(item) {
        this.props.hospitalActions.setCategoryGrade(item)
        this.props.hospitalActions.loadHosipitalList()
    }
}


const mapStateToProps = (state) => {
    return {
        hospitalList: getHospitalList(state),
        fetchingStatus: getFetchingStatus(state),
        isLastPage: getIsLastPage(state)
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        hospitalActions: bindActionCreators(hospitalActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalsContainer)