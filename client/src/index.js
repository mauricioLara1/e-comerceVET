import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Inicio from './componentes/inicio';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { ShopContextProvider } from './componentes/context-shop/context-shop';
import { LoginContextProvider } from './componentes/context-login/context-login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <LoginContextProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </LoginContextProvider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
