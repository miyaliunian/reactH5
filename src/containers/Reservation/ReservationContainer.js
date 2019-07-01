/**
 * Class: ReservationContainer
 * Author: wufei
 * Date: 2019/7/1
 * Description:
 *
 */
import React, {Component} from 'react'
import './style.less'
import Header from "@components/Header/NavBar";
export default class ReservationContainer extends Component {
    render() {
        return (
            <div>
                <Header title={'预约信息'} isRight={false} onBack={this.handleBack}/>
            </div>
        )
    }

    handleBack = () => {
        this.props.history.goBack()
    }
}    
