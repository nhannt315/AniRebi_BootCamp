import 'regenerator-runtime/runtime';
import { put } from 'redux-saga/effects';
import axios from '../../axios_anime';
import * as actions from '../actions/index';
import * as endpoints from '../../constants/endpoint_constants';
import * as keys from '../../constants/key_constants';

export function* logoutSaga() {
  localStorage.removeItem(keys.USER_DATA_LOCAL_KEY);
  localStorage.removeItem(keys.TOKEN_DATA_LOCAL_KEY);
  try {
    yield axios.delete(endpoints.LOGOUT_URL);
    yield put(actions.logoutSuccess());
  } catch (error) {
    yield put(actions.logoutFail());
  }
}


export function* loginSaga(action) {
  yield put(actions.startProcess());
  const data = {
    email: action.email,
    password: action.password
  };
  const isRemember = action.remember;
  try {
    const response = yield axios.post(endpoints.LOGIN_URL, data);
    const tokenData = {
      accessToken: response.headers['access-token'],
      client: response.headers['client'],
      uid: response.headers['uid'],
      tokenType: response.headers['token-type']
    };

    const userData = {
      email: response.data.data.email,
      birthday: response.data.data.birthday,
      name: response.data.data.name
    };
    if (isRemember) {
      localStorage.setItem(keys.TOKEN_DATA_LOCAL_KEY, JSON.stringify(tokenData));
      localStorage.setItem(keys.USER_DATA_LOCAL_KEY, JSON.stringify(userData));
    }
    yield put(actions.loginSuccess(userData, tokenData));
    yield put(actions.finishProcess());
  } catch (error) {
    put(actions.loginFailure(error.response));
  }
}

export function* signUpSaga(action) {
  yield put(actions.startProcess());
  const data = {
    email: action.email,
    name: action.name,
    password: action.password,
    birthday: action.birthday
  };
  try {
    const response = yield axios.post(endpoints.SIGN_UP_URL, data);
    const tokenData = {
      accessToken: response.headers['access-token'],
      client: response.headers['client'],
      uid: response.headers['uid'],
      tokenType: response.headers['token-type']
    };

    const userData = {
      email: response.data.data.email,
      birthday: response.data.data.birthday,
      name: response.data.data.name
    };
    yield put(actions.signUpSuccess(userData, tokenData));
    yield put(actions.finishProcess());
  }catch (error) {
    yield put(actions.signUpFailure(error.response));
  }
}

export function* authCheckStateSaga() {
  const userData = JSON.parse(localStorage.getItem(keys.USER_DATA_LOCAL_KEY));
  const tokenData = JSON.parse(localStorage.getItem(keys.TOKEN_DATA_LOCAL_KEY));
  if(userData && tokenData){
    yield put(actions.loginSuccess(userData, tokenData));
  }else{
    yield put(actions.logout());
  }
}