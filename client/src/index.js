import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import {compose,applyMiddleware,createStore, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import Reducers from './reducers/index';
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(Reducers, compose(applyMiddleware(thunk)))
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

