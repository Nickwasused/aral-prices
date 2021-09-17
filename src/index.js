import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';
require('intersection-observer');

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);