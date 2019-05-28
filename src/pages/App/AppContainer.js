import React, {Component} from 'react';
import './style.css';
import {bindActionCreators} from 'redux'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import {connect} from "react-redux";
import ErrorToast from '../../components/ErrorToast'
import {actions as appActions, getError} from "../../reduxs/modules/app";
import Home from '../Home/HomeContainer'
import ProductDetailContainer from "../ProductDetail/ProductDetailContainer";
import HospitalsContainer from "../Hospitals/HospitalsContainer";
import LoginContainer from "../Login/LoginContainer";
import LoadingMask from "../../components/Loading/LoadingMask";
//登录


class AppContainer extends Component {
    render() {
        const {
            error,
            appActions: {clearError}
        } = this.props;
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/login" component={LoginContainer}/>
                        <Route path="/hospitals" component={HospitalsContainer}/>
                        <Route path="/detail/:id" component={ProductDetailContainer}/>
                        <Route path="/loading" component={LoadingMask}/>
                        <Route path="/" component={Home}/>

                    </Switch>
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
