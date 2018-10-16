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

export const loginFailure = errors => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    errors: errors
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

export const signUpFailure = errors => {
  return {
    type: actionTypes.SIGN_UP_FAILURE,
    errors: errors
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS
  };
};

export const logoutFail = () => {
  return {
    type: actionTypes.LOGOUT_FAILURE
  };
};

export const forgotPassword = (email, redirect) => {
  return {
    type: actionTypes.AUTH_FORGOT_PASSWORD,
    email: email,
    redirect: redirect
  };
};

export const forgotPasswordComplete = (status) => {
  return {
    type: actionTypes.AUTH_FORGOT_PASSWORD_COMPLETE,
    status: status
  };
};

export const resetPassword = (password, passwordConfirm, data) => {
  return {
    type: actionTypes.AUTH_RESET_PASSWORD,
    password: password,
    passwordConfirm: passwordConfirm,
    data: data
  };
};

export const resetPasswordComplete = (status) => {
  return {
    type: actionTypes.AUTH_RESET_PASSWORD_COMPLETE,
    status: status
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

export const errorProcess = errors => {
  return {
    type: actionTypes.ERROR_PROCESSING,
    errors: errors
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};
