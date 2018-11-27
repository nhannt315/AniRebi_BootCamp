import * as actionTypes from './actionTypes';


export const searchAnime = (payload) => {
  return {
    type: actionTypes.SEARCH_ANIME_REQUEST,
    payload: payload
  };
};

export const searchAnimeSuccess = (payload) => {
  return {
    type: actionTypes.SEARCH_ANIME_SUCCESS,
    payload: payload
  };
};

export const searchAnimeFalure = (payload) => {
  return {
    type: actionTypes.SEARCH_ANIME_FAILURE,
    payload: payload
  };
};

export const searchAnimeStart = (payload) => {
  return {
    type: actionTypes.SEARCH_ANIME_START,
    payload: payload
  };
};

export const clearSearchResult = (payload) => {
  return {
    type: actionTypes.CLEAR_SEARCH_RESULT,
    payload: payload
  };
};

export const setSearchAdvanceConditions = (payload) => {
  return {
    type: actionTypes.SET_SEARCH_ADVANCE_CONDITION,
    payload: payload
  };
};

export const clearSearchConditions = (payload) => {
  return {
    type: actionTypes.CLEAR_SEARCH_CONDITION,
    payload: payload
  };
};