import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '@reduxs/store'
import './index.css';
import '@assets/less/reset.css'
import '@assets/less/border.less'
import App from '@containers/App/AppContainer';
ReactDOM.render(
    <Provider store={store}>
            <App/>
    </Provider>,
    document.getElementById('root')
);

