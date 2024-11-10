import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style/global.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './configs/store.js';
import LanguageProvider from './lang/LanguageProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </LanguageProvider>
      
  </React.StrictMode>
);
