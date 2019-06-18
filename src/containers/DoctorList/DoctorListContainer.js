/**
 * Class: DoctorListContainer
 * Author: wufei
 * Date: 2019-06-17
 * Description:
 *    门诊：医生列表
 */
import React, {Component, Fragment} from 'react';
import Header from "@components/Header/NavBar";
import DoctorTabs from "@containers/DoctorList/Components/Tab/DoctorTabs";
import DoctorItem from "@containers/DoctorList/Components/Item/DoctorItem";
import {connect} from "react-redux";
import {
    actions as doctorListActions,
    getFetchStatus,
    getDoctorList
} from "@reduxs/modules/doctorList";
import {bindActionCreators} from "redux";
import './style.less'



class DoctorListContainer extends Component {

    render() {
        const {name} = this.props.match.params
        const {doctors} = this.props
        return (
            <div className={'doctorList'}>
                <Header title={name} isRight={false} onBack={this.handleBack}/>
                <DoctorTabs/>
                <DoctorItem data={doctors}/>
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        const {id} = this.props.match.params
        this.props.doctorListActions.loadDoctorList(id)
    }
}


const mapStateToProps = (state) => {
    return {
        fetchingStatus: getFetchStatus(state),
        doctors: getDoctorList(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doctorListActions: bindActionCreators(doctorListActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorListContainer)