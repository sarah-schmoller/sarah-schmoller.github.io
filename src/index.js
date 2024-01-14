import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter basename="/PortfolioSite">
      <App />
    </BrowserRouter>,
  document.getElementById('root')
);
