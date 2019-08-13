/**
 * Class: HospitalizationManagementContainer
 * Author: wufei
 * Date: 2019/8/13
 * Description:
 *
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import HospitalizationList from "@containers/HospitalizationManagement/Components/Hospitalization/HospitalizationList";
import BindCardItem from "@components/BindCard/components/BindCardItem/BindCardItem";
import {Icon} from 'antd-mobile';
import Modal from '@material-ui/core/Modal';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as bindCardActions, getBindCardList} from "@reduxs/modules/bindCard";

import './style.less'

class HospitalizationManagementContainer extends Component {

    state = {
        openModalBindCardItem: false,
        openModalHospitalization: false,
    }

    render() {
        const {bindCardList} = this.props
        return (
            <div className={'hospitalizationManagement'}>
                <Header title={'住院服务'} isRight={false} onBack={this.handleBack}/>
                {/*-------------------------选择成员信息*/}
                <BindCardItem data={bindCardList} isRefresh={this.refresh}/>
                {/*-------------------------选择医院*/}
                <div className={'hospitalizationManagement_hospitalization'} onClick={() => {
                    this.setState({openModalHospitalization: true})
                }}>
                    <span className={'hospitalizationManagement_hospitalization_text_Style '}>就诊医院</span>
                    <div className={'hospitalization_right'}>
                        <span className={'hospitalization_right_text_Style'}>请选择医院</span>
                        <Icon className={'clinic__bar__icon'} type={'right'}/>
                    </div>
                </div>
                <Modal
                    // BackdropComponent={()=>{return <div className={'backDrop'}/>}}
                    BackdropProps={{'background-Color': 'red'}}
                    open={this.state.openModalHospitalization}
                >
                    <HospitalizationList onNavBack={() => this.handelModalHospitalization()}/>
                </Modal>
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }


    handelModalBindCardItem = () => {
        this.setState({openModalBindCardItem: false})
    };


    handelModalHospitalization = () => {
        this.setState({openModalHospitalization: false})
    };


    componentDidMount() {
        const {bindCardList} = this.props
        if (!bindCardList.length > 0) {
            this.props.bindCardActions.loadList()
        }
    }
}


const mapStateToProps = (state) => {
    return {
        bindCardList: getBindCardList(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        bindCardActions: bindActionCreators(bindCardActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalizationManagementContainer)