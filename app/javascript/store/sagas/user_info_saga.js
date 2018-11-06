import 'regenerator-runtime/runtime';
import { put } from 'redux-saga/effects';

import axios from '../../axios_anime';
import * as actions from '../actions/index';
import * as endpoints from '../../constants/endpoint_constants';
import * as keys from '../../constants/key_constants';

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


export function* fetchUserReviews(action) {
  const url = `${endpoints.USER_API}/${action.id}/review`;
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
    "uid": tokenData.uid,
    "expiry": tokenData.expiry
  };
  try {
    const response = yield axios.patch(url, data, {
      headers: headers
    });
    console.log(response);
    if (response.data.success === false){
      yield put(actions.updateProfileFailue(response.data.errors));
    } else {
      yield put(actions.updateProfileSuccess(response.data));
    }
  } catch (errors) {
    yield put(actions.updateProfileFailue(errors));
  }
}