import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';
import AdminApp from '../Admin/AdminApp';

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <AdminApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('bootcamp-admin-container')
);
