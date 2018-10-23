import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetching: true,
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
    default:
      return state;
  }
};

export default reducer;
