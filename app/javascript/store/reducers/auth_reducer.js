import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  userData: {},
  tokenData: {},
  errors: [],
  isFetching: true,
  isUpdating: false,
  updated: false,
  errors: null,
  userInfo: {},
  isProcessing: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_PROCESSING:
      return { ...state, isProcessing: true };
    case actionTypes.FINISH_PROCESSING:
      return { ...state, isProcessing: false };
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        tokenData: action.tokenData,
        isAuthenticated: true
      };
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.SIGN_UP_FAILURE:
      return { ...state, errors: action.errors };
    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        userData: {},
        tokenData: {},
        errors: []
      };
    case actionTypes.AUTH_FORGOT_PASSWORD_COMPLETE:
      return { ...state, status: action.status, errors: [] };
    case actionTypes.AUTH_RESET_PASSWORD_COMPLETE:
      return { ...state, status: action.status, errors: [] };
      case actionTypes.GET_USER_PROFILE_INFO:
      return {...state, isFetching: true};
    case actionTypes.GET_USER_PROFILE_INFO_SUCCESS:
      return {...state, isFetching: false, userInfo: action.userInfo};
    case actionTypes.GET_USER_PROFILE_INFO_FAILUE:
      return {...state, isFetching: false, errors: action.errors};
    case actionTypes.PATH_UPDATE_PROFILE:
      return {...state, isUpdating: true};
      case actionTypes.PATH_UPDATE_PROFILE_SUCCESS:
      return {
        ...state, 
        isUpdating: false,
        userInfo: action.userInfo,
        updated: true,
        userData: action.userData,
        tokenData: action.tokenData};
    case actionTypes.PATH_UPDATE_PROFILE_FAILUE:
      return {...state, isUpdating: false, errors: action.errors};
    default:
      return state;
  }
};

export default reducer;
