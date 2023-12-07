import 'react-loading-skeleton/dist/skeleton.css'
import './main.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <App/>
  </Provider>,
)
