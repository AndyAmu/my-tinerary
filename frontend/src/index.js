import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from './components/Body/Scroll'
import { Provider } from 'react-redux';
import mainReducer from './redux/reducers/mainReducer'
import {configureStore as createStore} from '@reduxjs/toolkit'

const reduxStore = createStore({reducer:mainReducer})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store = {reduxStore}>
    <BrowserRouter>
    <ScrollToTop />
    <App />
    </BrowserRouter>
    </Provider>
);
