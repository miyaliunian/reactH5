/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  首容器
 *
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {actions as homeActions} from '@reduxs/modules/home'
import {connect} from 'react-redux'
import Banner from './components/Banner'
import Category from './components/Category'
import HeadLine from './components/HeadLine'
import Activity from "./components/Activity/Activity";
import './style.less'


// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let wrapProps;
// if (isIPhone) {
//     wrapProps = {
//         onTouchStart: e => e.preventDefault(),
//     };
// }

import { Icon,ActionSheet} from 'antd-mobile';


class Home extends Component {
    render() {
        return (
            <div className={'home'}>
                {/*<Banner/>*/}
                <Category category={(index) => {
                    this.categoryClick(index)
                }}/>
                {/*<HeadLine/>*/}
                {/*<Activity/>*/}
            </div>
        )
    }


    categoryClick(index) {
        switch (index) {
            case 0 :
                this.props.history.push('/login')
            case 1 :
                this.props.history.push('/register')
                break
            case 2 :
                this.props.history.push('/hospitals')
                break
            case 3 :
                this.props.history.push('/bindCard')
                break
            case 4 :
                this.props.history.push('/intelligentWaiting')
                break
            case 5 :
                this.props.history.push('/hospitalizationManagement')
                break
            case 6 :
                this.props.history.push('/orderReservationDoctor')
                break
            case 7:
                this.props.history.push('/payCountdown')
                break
            case 8:
                this.props.history.push('/orderContainer')
                break
            case 9:
                this.showActionSheet()
                break
        }
    }

    fetchMoreLikes = () => {
        this.props.homeActions.loadLikes()
    }


    showActionSheet = () => {
        const BUTTONS = ['Operation1', 'Operation2', 'Operation2', 'Delete', 'Cancel'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                destructiveButtonIndex: BUTTONS.length - 2,

                message: 'I am description, description, description',
                maskClosable: true,
            },
            (buttonIndex) => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
            });
    }


}


const mapStateToProps = (state, props) => {
    return {
        // likes: getLists(state),
        // discounts: getDiscounts(state),
        // pageCount: getPageCountOfLikes(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        homeActions: bindActionCreators(homeActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


