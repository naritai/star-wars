import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { themeOptions } from "shared/config/themeConfig/themeConfig";
import { StoreProvider } from "app/providers/store-provider";
import { ErrorBoundary } from "app/providers/error-boundary";
import { ErrorPage } from "pages/error-page";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { NODE_ENVS } from "shared/types/types";
import "./app/styles/index.scss";

if (process.env.NODE_ENV === NODE_ENVS.PROD) {
  disableReactDevTools();
}

const theme = createTheme(themeOptions);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<ErrorPage />}>
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StoreProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
