import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <App />
  </Provider>
  
);

reportWebVitals();