import 'regenerator-runtime/runtime';
import { put } from 'redux-saga/effects';
import axios from '../../axios_anime';
import * as actions from '../actions/index';
import * as endpoints from '../../constants/endpoint_constants';
import * as keys from '../../constants/key_constants';

export function* logoutSaga() {
  try {
    yield axios.delete(endpoints.LOGOUT_URL);
    yield clearData();
  }catch (error) {
    yield clearData();
  }
}

const clearData = () => {
  localStorage.removeItem(keys.USER_DATA_LOCAL_KEY);
  localStorage.removeItem(keys.TOKEN_DATA_LOCAL_KEY);
  put(actions.logoutSuccess());
};

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
      yield localStorage.setItem(keys.TOKEN_DATA_LOCAL_KEY, JSON.stringify(tokenData));
      yield localStorage.setItem(keys.USER_DATA_LOCAL_KEY, JSON.stringify(userData));
    }
    yield put(actions.loginSuccess(userData, tokenData));
    yield put(actions.finishProcess());
  }catch (error){
    yield put(actions.loginFailure(error.response));
  }
}