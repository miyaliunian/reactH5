import React, { Component } from "react";
import { BrowserRouter, Route, Switch, withRouter, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { isLogin } from "@api/token";
import routerMap from "@routes/index";
import ErrorBoundary from "@baseUI/ErrorBoundary/ErrorBoundary";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as appActions, getError } from "@reduxs/modules/app";
//样式
import "./style.less";


const ANIMATION = {
  PUSH: "forward",
  POP: "back"
};

const Routes = withRouter(({ location, history }) => (
  <TransitionGroup
    className={"router-wrapper"}
    childFactory={child => React.cloneElement(child, { classNames: ANIMATION[history.action] })}>
    <CSSTransition timeout={500} key={location.pathname}>
      <ErrorBoundary>
        <Switch location={location}>
          {routerMap.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                exact
                render={props =>
                  !item.requiresAuth ? (
                    <item.component {...props} />
                  ) : isLogin() ? (
                    <item.component {...props} />
                  ) : (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { from: props.location }
                      }}
                    />
                  )
                }
              />
            );
          })}
        </Switch>
      </ErrorBoundary>
    </CSSTransition>
  </TransitionGroup>
));

class AppContainer extends Component {
  state = {
    showBar: false
  };

  render() {
    return (
      <div>
        <BrowserRouter basename={"/h5"}>
          <Routes/>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: getError(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
