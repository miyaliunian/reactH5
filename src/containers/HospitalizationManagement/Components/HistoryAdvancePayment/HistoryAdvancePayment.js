/**
 * Class: HistoryAdvancePayment
 * Author: wufei
 * Date: 2019-08-15
 * Description:
 */
import React, {Component} from 'react';
import Header from "@components/Header/NavBar";


export default class HistoryAdvancePayment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={'historyAdvancePayment'}>
                <Header title={'历史缴纳预交金'} isRight={false} onBack={this.handleBack}/>
            </div>
        );
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
    }
}
