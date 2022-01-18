import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { rootReducer } from './store/root-reduser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAPI } from './services/api';
import { fetchGuitarsAction } from './store/guitars-data/api-action';
import { redirect } from './store/middlewares/redirect';
import { configureStore } from '@reduxjs/toolkit';
import {Router as BrowserRouter} from 'react-router-dom';
import browserHistory from './browser-history';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(fetchGuitarsAction());
//store.dispatch(fetchGuitarsForPrice());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

