import React from 'react';
import ReactDOM from 'react-dom';

import './styles/global_.css';
import './styles/new.css';
import './styles/global.css';
import './styles/reset.css';

import { Provider } from './Context';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));
