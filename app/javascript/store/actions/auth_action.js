import * as actionTypes from './actionTypes';

export const login = (email , password, remember) => {
  return {
    type: actionTypes.LOGIN,
    email: email,
    password: password,
    remember: remember
  };
};

export const loginSuccess = (userData, tokenData) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    userData: userData,
    tokenData: tokenData
  };
};

export const loginFailure = error => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    errorMsg: error
  };
};

export const signUp = (email, name, password, birthday) => {
  return {
    type: actionTypes.SIGN_UP,
    email: email,
    name: name,
    password: password,
    birthday: birthday
  };
};

export const signUpSuccess = (userData, tokenData) => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    userData: userData,
    tokenData: tokenData
  };
};

export const signUpFailure = error => {
  return {
    type: actionTypes.SIGN_UP_FAILURE,
    errorMsg: error
  };
};

export const startProcess = () => {
  return {
    type: actionTypes.START_PROCESSING
  };
};

export const finishProcess = () => {
  return {
    type: actionTypes.FINISH_PROCESSING
  };
};

