import * as actionTypes from './actionTypes';

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

export const getAnimeById = id => {
  return {
    type: actionTypes.GET_ANIME_BY_ID,
    id: id
  };
};

export const getAnimeByIdStart = () => {
  return {
    type: actionTypes.GET_ANIME_BY_ID_START
  };
};

export const getAnimeByIdSuccess = result => {
  return {
    type: actionTypes.GET_ANIME_BY_ID_SUCCESS,
    data: result
  };
};

export const getAnimeByIdFailure = errors => {
  return {
    type: actionTypes.GET_ANIME_BY_ID_FAILURE,
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

export const getMultipleGenreTop = (idArr, limit) => {
  return {
    type: actionTypes.GET_MULTIPLE_GENRE_TOP,
    idArr: idArr,
    limit: limit
  };
};

export const getMultipleGenreTopStart = () => {
  return {
    type: actionTypes.GET_MULTIPLE_GENRE_TOP_START
  };
};

export const getMultipleGenreTopSuccess = result => {
  return {
    type: actionTypes.GET_MULTIPLE_GENRE_TOP_SUCCESS,
    data: result
  };
};

export const getMultipleGenreTopFailure = errors => {
  return {
    type: actionTypes.GET_MULTIPLE_GENRE_TOP_FAILURE,
    errors: errors
  };
};

export const getReviewsByAnime = id => {
  return {
    type: actionTypes.GET_REVIEWS_BY_ANIME,
    id: id
  };
};

export const getReviewsByAnimeStart = () => {
  return {
    type: actionTypes.GET_REVIEWS_BY_ANIME_START
  };
};

export const getReviewsByAnimeSuccess = result => {
  return {
    type: actionTypes.GET_REVIEWS_BY_ANIME_SUCCESS,
    data: result
  };
};

export const getReviewsByAnimeFailure = errors => {
  return {
    type: actionTypes.GET_REVIEWS_BY_ANIME_FAILURE,
    errors: errors
  };
};
