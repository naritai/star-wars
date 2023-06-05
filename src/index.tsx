import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { themeOptions } from 'shared/config/themeConfig/themeConfig';
import { StoreProvider } from 'app/providers/store-provider';
import './app/styles/index.scss';

const theme = createTheme(themeOptions);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);