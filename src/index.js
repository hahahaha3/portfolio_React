import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AuthService from './service/auth_service';

const authService = new AuthService();
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App authService={authService} />
        </PersistGate>      
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);