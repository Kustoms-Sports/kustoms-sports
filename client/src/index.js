import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { store } from './redux/store';
import dotenv from 'dotenv';
import { Auth0Provider } from '@auth0/auth0-react'

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider 
          domain='dev--8qiaasi.us.auth0.com' 
          clientId='MWAmBOHdjjaZZv0oaLUKeDKCw6H52Efr' 
          redirectUri={window.location.origin} >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

