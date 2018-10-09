import * as actionTypes from "./actionTypes";

export const getTopAnime = (page, itemPerPage) => {
  return {
    type: actionTypes.GET_TOP_ANIME,
    page: page,
    itemPerPage: itemPerPage
  };
};

export const getTopAnimeStart = () => {
  return {
    type: actionTypes.GET_TOP_ANIME_START
  };
};

export const getTopAnimeSuccess = result => {
  return {
    type: actionTypes.GET_TOP_ANIME_SUCCESS,
    data: result
  };
};

export const getTopAnimeFailure = errors => {
  return {
    type: actionTypes.GET_TOP_ANIME_FAILURE,
    errors: errors
  };
};

export const getGenresList = (page, itemPerPage) => {
  return {
    type: actionTypes.GET_GENRES_LIST,
    page: page,
    itemPerPage: itemPerPage
  };
};

export const getGenresListStart = () => {
  return {
    type: actionTypes.GET_GENRES_LIST_START
  };
};

export const getGenresListSuccess = result => {
  return {
    type: actionTypes.GET_GENRES_LIST_SUCCESS,
    data: result
  };
};

export const getGenresListFailure = errors => {
  return {
    type: actionTypes.GET_GENRES_LIST_FAILURE,
    errors: errors
  };
};

export const getGenreTop = (id, limit) => {
  return {
    type: actionTypes.GET_GENRE_TOP,
    id: id,
    limit: limit
  };
};

export const getGenreTopStart = () => {
  return {
    type: actionTypes.GET_GENRE_TOP_START
  };
};

export const getGenreTopSuccess = result => {
  return {
    type: actionTypes.GET_GENRE_TOP_SUCCESS,
    data: result
  };
};

export const getGenreTopFailure = errors => {
  return {
    type: actionTypes.GET_GENRE_TOP_FAILURE,
    errors: errors
  };
};
