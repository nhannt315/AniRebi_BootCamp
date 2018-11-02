import * as actionTypes from './actionTypes';

export const getProfile = (id, owner) => {
  return {
    type: actionTypes.GET_USER_PROFILE_INFO,
    id: id,
    isOwner: owner
  };
};


export const getProfileSuccess = (userInfo) => {
  return {
    type: actionTypes.GET_USER_PROFILE_INFO_SUCCESS,
    userInfo: userInfo
  };
};

export const getProfileFailue = (errors) => {
  return {
    type: actionTypes.GET_USER_PROFILE_INFO_FAILUE,
    errors: errors
  };
};
