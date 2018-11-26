import 'regenerator-runtime/runtime';
import { put } from 'redux-saga/effects';
import axios from '../../axios_anime';
import * as actions from '../actions/index';
import * as endpoints from '../../constants/endpoint_constants';
import * as keys from '../../constants/key_constants';

export function* logoutSaga() {
  const tokenData = JSON.parse(localStorage.getItem(keys.TOKEN_DATA_LOCAL_KEY));
  const headers = {
    'access-token': tokenData.accessToken,
    'token-type': tokenData.tokenType,
    uid: tokenData.uid,
    client: tokenData.client
  };
  localStorage.removeItem(keys.USER_DATA_LOCAL_KEY);
  localStorage.removeItem(keys.TOKEN_DATA_LOCAL_KEY);
  try {
    yield axios.delete(endpoints.LOGOUT_URL, {id: '1'}, {headers: headers});
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
      tokenType: response.headers['token-type'],
      expiry: response.headers['expiry']
    };

    const userData = {
      email: response.data.data.email,
      birthday: response.data.data.birthday,
      name: response.data.data.name,
      id: response.data.data.id,
      admin: response.data.data.admin
    };
    if (isRemember) {
      localStorage.setItem(keys.TOKEN_DATA_LOCAL_KEY, JSON.stringify(tokenData));
      localStorage.setItem(keys.USER_DATA_LOCAL_KEY, JSON.stringify(userData));
    }
    yield put(actions.loginSuccess(userData, tokenData));
    yield put(actions.finishProcess());
  } catch (error) {
    yield put(actions.loginFailure(error.response.data.errors));
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
      name: response.data.data.name,
      id: response.data.data.id,
      admin: response.data.data.admin
    };
    yield put(actions.signUpSuccess(userData, tokenData));
    yield put(actions.finishProcess());
  }catch (error) {
    yield put(actions.signUpFailure(error.response));
  }
}

export function* forgotPasswordSaga(action) {
  yield put(actions.startProcess());
  const data = {
    email: action.email,
    redirect_url: action.redirect,
  };
  try {
    const response = yield axios.post(endpoints.FORGOT_URL, data);
    yield put(actions.forgotPasswordComplete(response.data.success));
    yield put(actions.finishProcess());
  }catch (error) {
    yield put(actions.errorProcess(error.response));
  }
}

export function* resetPasswordSaga(action) {
  yield put(actions.startProcess());
  const data = {
    password: action.password,
    password_confirmation: action.passwordConfirm,
  };
  try {
    const response = yield axios.put(endpoints.FORGOT_URL, data, {
      headers: action.data
    });
    yield put(actions.resetPasswordComplete(response.data.success));
    yield put(actions.finishProcess());
  }catch (error) {
    yield put(actions.errorProcess(error.response));
  }
}

export function* fetchUserInfo(action) {
  const url = `${endpoints.USER_API}/${action.id}`;
  try {
    const response = yield axios.get(url);
    if (response.data.success === false){
      yield put(actions.getProfileFailue(response.data.errors));
    } else {
      yield put(actions.getProfileSuccess(response.data));
    }
  } catch (errors) {
    yield put(actions.getProfileFailue(errors));
  }
}

export function* updateUserInfo(action) {
  const url = `${endpoints.USER_API}/${action.id}`;
  const data = {
    name: action.name,
    email: action.email
  };
  
  const tokenData = JSON.parse(localStorage.getItem(keys.TOKEN_DATA_LOCAL_KEY));

  const headers =  {
    "access-token": tokenData.accessToken,
    "client": tokenData.client,
    "uid": tokenData.uid
  };
  try {
    const response = yield axios.patch(url, data, {
      headers: headers
    });
    
    const tokenDatas = {
      accessToken: response.headers['access-token'],
      client: response.headers['client'],
      uid: response.headers['uid'],
      tokenType: response.headers['token-type'],
      expiry: response.headers['expiry']
    };

    if(tokenDatas.accessToken)
      localStorage.setItem(keys.TOKEN_DATA_LOCAL_KEY, JSON.stringify(tokenDatas));
    else {
      tokenData.uid = response.data.email;
      localStorage.setItem(keys.TOKEN_DATA_LOCAL_KEY, JSON.stringify(tokenData));
    }
    if (response.data.success === false){
      yield put(actions.updateProfileFailue(response.data.errors));
    } else {
      const userData = {
        birthday: response.data.birthday,
        email: response.data.email,
        id: response.data.id,
        name: response.data.name,
        admin: response.data.admin
      }
      localStorage.setItem(keys.USER_DATA_LOCAL_KEY, JSON.stringify(userData));
      yield put(actions.updateProfileSuccess(response.data, userData, tokenData));
    }
  } catch (errors) {
    yield put(actions.updateProfileFailue(errors));
  }
}

export function* authCheckStateSaga() {
  const userData = JSON.parse(localStorage.getItem(keys.USER_DATA_LOCAL_KEY));
  const tokenData = JSON.parse(localStorage.getItem(keys.TOKEN_DATA_LOCAL_KEY));
  if(userData && tokenData){
    yield put(actions.loginSuccess(userData, tokenData));
  }
}
