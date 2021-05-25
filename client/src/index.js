import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {Provider} from 'react-redux';
import store from './store/store';

import './resource/styles/style.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
