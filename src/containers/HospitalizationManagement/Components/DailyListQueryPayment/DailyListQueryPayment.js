/**
 * Class: DailyListQueryPayment
 * Author: wufei
 * Date: 2019-08-15
 * Description:
 */
import React, {Component} from 'react';
import Header from "@components/Header/NavBar";
export default class DailyListQueryPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={'dailyListQueryPayment'}>
                <Header title={'一日清单'} isRight={false} onBack={this.handleBack}/>
            </div>
        );
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
    }
}

