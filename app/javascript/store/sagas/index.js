import { all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {
  loginSaga,
  logoutSaga,
  authCheckStateSaga,
  signUpSaga
}from './auth_saga';

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.LOGIN, loginSaga),
    takeLatest(actionTypes.LOGOUT, logoutSaga),
    takeLatest(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    takeLatest(actionTypes.SIGN_UP, signUpSaga)
  ]);
}