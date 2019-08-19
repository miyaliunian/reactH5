/**
 * Class: DailyListQueryPayment
 * Author: wufei
 * Date: 2019-08-15
 * Description:
 * 一日清单
 */
import React, {Component} from 'react';
import Header from "@components/Header/NavBar";
import DynamicTabs
    from "@containers/HospitalizationManagement/Components/DailyListQueryPayment/Components/DynamicTabs/DynamicTabs";
import ListOfContent
    from "@containers/HospitalizationManagement/Components/DailyListQueryPayment/Components/ListOfContent/ListOfContent";

export default class DailyListQueryPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={'dailyListQueryPayment'}>
                <Header title={'一日清单'} isRight={false} onBack={this.handleBack}/>
                <DynamicTabs/>
                <ListOfContent/>
            </div>
        );
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        const {hosId, inHosNo} = this.props.match.params
        console.log(hosId, inHosNo)
    }
}

