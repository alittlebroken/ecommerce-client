import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';

// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);