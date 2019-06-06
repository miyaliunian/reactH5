/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  redux-store并结合ReactDevTool
 */
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk' //处理异步action
import api from './middleware/api'
import rootReducer from './modules'

let store;

if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, api)));
} else {
    store = createStore(rootReducer, applyMiddleware(thunk, api))
}


export default store