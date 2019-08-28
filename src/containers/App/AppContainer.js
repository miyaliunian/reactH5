import React, {Component, lazy, Suspense,} from 'react';
import './style.less';
import {bindActionCreators} from 'redux'
import {BrowserRouter, Route, Switch, withRouter, Redirect} from "react-router-dom"
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from "react-redux";
import ErrorToast from '@components/ErrorToast'
import {actions as appActions, getError} from "@reduxs/modules/app";
import {isLogin} from '@utils/token'
import routerMap from '@routes/routerMap'
import renderRoutes from '@utils/renderRoutes'



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
                <div>
                    <Switch location={props.location}>
                        {renderRoutes(routerMap, isLogin())}
                    </Switch>
                </div>
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

                    <BrowserRouter>
                        <Routes/>
                    </BrowserRouter>
                    {error ? <ErrorToast msg={error} clearError={clearError}/> : null}

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
