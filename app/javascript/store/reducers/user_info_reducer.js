import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetching: true,
  isUpdating: false,
  updated: false,
  errors: null,
  userInfo: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_PROFILE_INFO:
      return {...state, isFetching: true};
    case actionTypes.GET_USER_PROFILE_INFO_SUCCESS:
      return {...state, isFetching: false, userInfo: action.userInfo};
    case actionTypes.GET_USER_PROFILE_INFO_FAILUE:
      return {...state, isFetching: false, errors: action.errors};
    case actionTypes.PATH_UPDATE_PROFILE:
      return {...state, isUpdating: true};
      case actionTypes.PATH_UPDATE_PROFILE_SUCCESS:
      return {...state, isUpdating: false, userInfo: action.userInfo, updated: true};
    case actionTypes.PATH_UPDATE_PROFILE_FAILUE:
      return {...state, isUpdating: false, errors: action.errors};
    default:
      return state;
  }
};

export default reducer;
