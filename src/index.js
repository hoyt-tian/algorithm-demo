import React from 'react';
import ReactDOM from 'react-dom';
import WechatApp from './app.jsx';
import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux'
import * as reducers from './reducer';


let store = createStore(combineReducers(reducers), {
    currentView:0
});

let item = ReactDOM.render(
    <Provider store={store}>
        <WechatApp />
    </Provider>, document.getElementById('WechatApp'));