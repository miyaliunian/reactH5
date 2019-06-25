/**
 * Class: DoctorContainer
 * Author: wufei
 * Date: 2019/6/25
 * Description:
 *  医生详情
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import DoctorTitle from "@containers/Doctor/Components/DoctorTitle/DoctorTitle";
import DoctorDesc from "@containers/Doctor/Components/DoctorDesc/DoctorDesc";
import './style.less'
import DoctorVisiting from "@containers/Doctor/Components/DoctorVisiting/DoctorVisiting";

export default class DoctorContainer extends Component {
    render() {
        return (
            <div className={'doctor'}>
                <Header title={'医生详情'} isRight={false} onBack={() => this.handleBack()}/>
                <DoctorTitle/>
                <DoctorDesc/>
                <div className={'doctor__interval'}/>
                <DoctorVisiting
                    pullingUpHandler={() => this.pullingUpHandler()}
                />
            </div>
        )
    }


    pullingUpHandler() {
        console.log('上啦刷新')
    }

    handleBack() {
        this.props.history.goBack()
    }
}    
