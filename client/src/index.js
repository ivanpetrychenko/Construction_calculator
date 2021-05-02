import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {Provider} from 'react-redux';
import store from './store/store';
import {ServiceProvider} from './context/ServiceAppContext';

import './resource/styles/style.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ServiceProvider>
            <App />
        </ServiceProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
