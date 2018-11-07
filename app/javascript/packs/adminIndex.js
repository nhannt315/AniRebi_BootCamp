import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AdminApp from '../Admin/AdminApp';
import {Provider} from 'react-redux';
import store from '../store';

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <AdminApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('bootcamp-admin-container')
);
