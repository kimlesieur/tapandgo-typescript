import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);


if ('serviceWorker' in navigator) {
    serviceWorkerRegistration.register()
    console.log("service-worker installed")
} else {
    console.log("error with service-worker")
}



