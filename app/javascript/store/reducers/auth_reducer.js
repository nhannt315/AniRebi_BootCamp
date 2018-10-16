import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  userData: {},
  tokenData: {},
  errors: [],
  isProcessing: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_PROCESSING:
      return {...state, isProcessing: true};
    case actionTypes.FINISH_PROCESSING:
      return {...state, isProcessing: false};
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.SIGN_UP_SUCCESS:
      return {...state, userData: action.userData, tokenData: action.tokenData, isAuthenticated: true};
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.SIGN_UP_FAILURE:
      return {...state, errors: action.errors};
    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.LOGOUT_FAILURE:
      return {...state, isAuthenticated: false, userData: {}, tokenData: {}, errors: []};
    case actionTypes.AUTH_FORGOT_PASSWORD_COMPLETE:
      console.log(status);
      return {...state, status: action.status, errors: []};
    case actionTypes.AUTH_RESET_PASSWORD_COMPLETE:
      return {...state, status: action.status, errors: []};
    default:
      return state;
  }
};

export default reducer;
