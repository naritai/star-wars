import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/';
import { BrowserRouter } from 'react-router-dom';
import './app/styles/index.scss';
import { ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from 'shared/config/themeConfig/themeConfig';

const theme = createTheme(themeOptions);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);