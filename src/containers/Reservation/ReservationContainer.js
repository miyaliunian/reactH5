/**
 * Class: ReservationContainer
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *   预约信息
 */
import React, {Component} from 'react'
import Header from "@components/Header/NavBar";
import Button from "@components/Button/Button";
import ReservationHeader from "@containers/Reservation/Components/ReservationHeader/ReservationHeader";
import ReservationForm from "@containers/Reservation/Components/ReservationForm/ReservationForm";

import './style.less'
export default class ReservationContainer extends Component {
    render() {
        return (
            <div className={'reservation'}>
                <Header title={'预约信息'} isRight={false} onBack={this.handleBack}/>
                <ReservationHeader/>
                <div className={'reservation__interval'}/>
                <ReservationForm/>
                <div className={'reservationForm__btn'}>
                    <Button txt={'确认预约'}/>
                </div>
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }
}    
