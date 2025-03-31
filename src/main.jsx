import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import store from "./redux/store.js";

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </>,
)