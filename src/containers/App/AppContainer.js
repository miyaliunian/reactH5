import React, {Component, Fragment} from 'react';
import './style.less';
import {bindActionCreators} from 'redux'
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom"
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from "react-redux";
import ErrorToast from '@components/ErrorToast'
import {actions as appActions, getError} from "@reduxs/modules/app";
import routerMap from '@routes/routerMap'

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
                <div>
                    <Switch location={props.location}>
                        {
                            routerMap.map((v, i) => {
                                if (v.exact) {
                                    return <Route key={i} exact path={v.path} component={v.component}/>
                                } else {
                                    return <Route key={i} path={v.path} component={v.component}/>
                                }
                            })
                        }
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
            <Fragment>
                <Router forceRefresh={false}>
                    <Routes/>
                </Router>
                {error ? <ErrorToast msg={error} clearError={clearError}/> : null}
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
