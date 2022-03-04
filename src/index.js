import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import store from './store/store';
import { Provider } from 'react-redux';

import App from './components/App/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);