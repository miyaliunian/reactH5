/**
 * Class: DoctorListContainer
 * Author: wufei
 * Date: 2019-06-17
 * Description:
 *    医生列表
 */
import React, {Component, Fragment} from 'react';
import Header from "@components/Header/NavBar";

export default class DoctorListContainer extends Component {

    render() {
        const {name} = this.props.match.params
        return (
            <Fragment>
                <Header title={name} isRight={false} onBack={this.handleBack}/>
            </Fragment>
        )
    }


    handleBack = () => {
        this.props.history.goBack()
    }
}
