/**
 * Class:
 * Author: wufei
 * Date: 2019-05-22
 * Description:  redux-store
 */
import {createStore, applyMiddleware} from 'redux'
//处理异步action
import thunk from 'redux-thunk'
import api from './middleware/api'
import rootReducer from './modules'

let store;

//扩展了devTools->:判断是不是在生产环境下运行
if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, api)));
} else {
    store = createStore(rootReducer, applyMiddleware(thunk, api))
}

//没有扩展devTools
// store = createStore(rootReducer, applyMiddleware(thunk))

export default store