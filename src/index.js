import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './reduxs/store'
import './index.css';
import './assets/less/reset.css'
import './assets/less/border.less'
import App from './pages/App/AppContainer';
import {Provider as KeepAliveProvider} from 'react-keep-alive';

ReactDOM.render(
    <Provider store={store}>
        <KeepAliveProvider>
            <App/>
        </KeepAliveProvider>
    </Provider>,
    document.getElementById('root')
);

