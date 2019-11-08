import React, {Component, lazy, Suspense,} from 'react';
import './style.less';
import {bindActionCreators} from 'redux'
import {ToastContainer, Flip} from 'react-toastify'
import PureWrapper from '@baseUI/PureWrapper'
import {BrowserRouter as Router, Route, Switch, withRouter, Redirect} from "react-router-dom"
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from "react-redux";
import ErrorToast from '@components/ErrorToast'
import {actions as appActions, getError} from "@reduxs/modules/app";
import {isLogin} from '@utils/token'
import 'antd-mobile/lib/action-sheet/style';
import routerMap from '@routes/index'
import ErrorBoundary from "@baseUI/ErrorBoundary/ErrorBoundary";
import 'react-toastify/dist/ReactToastify.css'

const PureToastContainer = PureWrapper(ToastContainer)


const ANIMATION_MAP = {
    PUSH: 'forward',
    POP: 'back'
}

const Routes = withRouter(({location, history}) => (
    <TransitionGroup
        className={'router-wrapper'}
        childFactory={child => React.cloneElement(
            child,
            {classNames: ANIMATION_MAP[history.action]}
        )}
    >
        <CSSTransition
            timeout={500}
            key={location.pathname}
        >
            <ErrorBoundary>
                <Switch location={location}>
                    {routerMap.map((item, index) => {
                        return <Route key={index} path={item.path} exact render={props =>
                            (!item.requiresAuth ? (<item.component {...props} />) : (isLogin() ?
                                    <item.component {...props} /> :
                                    <Redirect to={{
                                        pathname: '/login',
                                        state: {from: props.location}
                                    }}/>)
                            )}/>
                    })}
                </Switch>
            </ErrorBoundary>
        </CSSTransition>
    </TransitionGroup>
));


class AppContainer extends Component {

    state = {
        showBar: false
    }

    render() {
        const {error, appActions: {clearError}} = this.props;
        return (
            <div>
                {/*<CssBaseline/>*/}
                <PureToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnVisibilityChange={false}
                    draggable={false}
                    pauseOnHover={false}
                />
                <Router>
                    <Routes/>
                </Router>
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
