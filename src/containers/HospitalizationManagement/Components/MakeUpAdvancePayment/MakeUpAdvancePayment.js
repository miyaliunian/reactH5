/**
 * Class: MakeUpAdvancePayment
 * Author: wufei
 * Date: 2019-08-15
 * Description:
 * 补缴预交金
 */
import React, {Component} from 'react';
import Header from "@components/Header/NavBar";
import './style.less'


export default class MakeUpAdvancePayment extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {inName,inHosNo} = this.props.match.params
        return (
            <div className={'makeUpAdvancePayment'}>
                <Header title={'补缴预交金'} isRight={false} onBack={this.handleBack}/>
                <div className={'makeUpAdvancePayment_header'}>
                    <div className={'makeUpAdvancePayment_header_row'}>
                        <span style={{color: '#6E6E6E',fontSize:'16px',display:'inline-block',width:'70px'}}>住院号</span>
                        <span style={{fontSize:'16px'}}>{inHosNo}</span>
                    </div>
                    <div className={'makeUpAdvancePayment_header_row'}>
                        <span style={{color: '#6E6E6E',fontSize:'16px',display:'inline-block',width:'60px'}}>姓名</span>
                        <span style={{fontSize:'16px'}}>{inName}</span>
                    </div>
                </div>
            </div>
        );
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
    }
}



