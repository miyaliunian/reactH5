import React, {Component, lazy, Suspense,} from 'react';
import './style.less';
import {bindActionCreators} from 'redux'
import {BrowserRouter, Route, Switch, withRouter, Redirect} from "react-router-dom"
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from "react-redux";
import ErrorToast from '@components/ErrorToast'
import {actions as appActions, getError} from "@reduxs/modules/app";
import {isLogin} from '@utils/token'
import routerMap from '@routes/RouterConfig'
import renderRoutes from '@utils/renderRoutes'
import ErrorBoundary from "@baseUI/ErrorBoundary/ErrorBoundary";


const RouteModule = function (props) {
    return (
        <TransitionGroup
            style={{position: 'relative'}}
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
                {renderRoutes(routerMap, isLogin())}
            </CSSTransition>
        </TransitionGroup>
    );
};


class AppContainer extends Component {

    state = {
        showBar: false
    }

    render() {
        const {error, appActions: {clearError}} = this.props;
        const Routes = withRouter(RouteModule);
        return (
            <div>
                <BrowserRouter>
                    <Routes/>
                </BrowserRouter>
                <ErrorToast desc={error} show={this.state.showBar}/>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        error: getError(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
