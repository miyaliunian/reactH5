import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './reduxs/store'
import './index.css';
import './assets/styles/reset.css'
import './assets/styles/border.css'
import App from './pages/App/AppContainer';


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

