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

export const updateProfile = (id, name, email) => {
  return {
    type: actionTypes.PATH_UPDATE_PROFILE,
    id: id,
    name: name,
    email: email
  }
}

export const updateProfileSuccess = (userInfo) => {
  return {
    type: actionTypes.PATH_UPDATE_PROFILE_SUCCESS,
    userInfo: userInfo
  }
}

export const updateProfileFailue = (errors) => {
  return {
    type: actionTypes.PATH_UPDATE_PROFILE_FAILUE,
    errors: errors
  };
};