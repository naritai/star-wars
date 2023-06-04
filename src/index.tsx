import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/';
import { BrowserRouter } from 'react-router-dom';
import './app/styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);