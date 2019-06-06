import React, {Component} from 'react';
import './style.less';
import {bindActionCreators} from 'redux'
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from "react-redux";
import ErrorToast from '@components/ErrorToast'
import {actions as appActions, getError} from "@reduxs/modules/app";
import Home from '../Home/HomeContainer'
import HospitalsContainer from "../Hospitals/HospitalsContainer";
import LoginContainer from "../Login/LoginContainer";
import LoadingMask from "@components/Loading/LoadingMask";
import DivisionContainer from "../Division/DivisionContainer";


const RouteModule = function (props) {
    return (
        <TransitionGroup
            style={{position: 'releative'}}
            childFactory={child => React.cloneElement(
                child,
                {classNames: props.history.action === 'PUSH' ? 'app4-push' : 'app4-pop'}
            )}
        >
            <CSSTransition
                key={props.location.pathname}
                timeout={500}
                classNames={props.history.action === 'PUSH' ? 'app4-push' : 'app4-pop'}
            >
                <Switch location={props.location}>
                    <Switch>
                        <Route path="/clinic" component={DivisionContainer}/>
                        <Route path="/login" component={LoginContainer}/>
                        <Route path="/hospitals" component={HospitalsContainer}/>
                        <Route path="/loading" component={LoadingMask}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
};


class AppContainer extends Component {
    render() {
        const {error, appActions: {clearError}} = this.props;
        const Routes = withRouter(RouteModule);
        return (
            <div>
                <Router forceRefresh={false}>
                    <Routes/>
                </Router>
                {error ? <ErrorToast msg={error} clearError={clearError}/> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: getError(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
