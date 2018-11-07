import * as actionTypes from './actionTypes';

export const getGenreDetail = (genreId, page, perPage) => {
  return {
    type: actionTypes.GET_GENRE_DETAIL,
    genreId: genreId,
    page: page,
    perPage: perPage
  };
};

export const getGenreStart = () => {
  return {
    type: actionTypes.GET_GENRE_DETAIL_START
  };
};

export const getGenreSuccess = (results) => {
  return {
    type: actionTypes.GET_GENRE_DETAIL_SUCCESS,
    data: results
  };
};

export const getGenreFailure = (error) => {
  return {
    type: actionTypes.GET_GENRE_DETAIL_FAILURE,
    error: error
  };
};

export const getAnimeListGenre = (genreId, page, perPage) => {
  return {
    type: actionTypes.GET_ANIME_LIST_GENRE,
    genreId: genreId,
    page: page,
    perPage: perPage
  };
};

export const getAnimeListGenreStart = () => {
  return {
    type: actionTypes.GET_ANIME_LIST_GENRE_START
  };
};

export const getAnimeListGenreSuccess = (results) => {
  return {
    type: actionTypes.GET_ANIME_LIST_GENRE_SUCCESS,
    data: results
  };
};

export const getAnimeListGenreFailure = (error) => {
  return {
    type: actionTypes.GET_ANIME_LIST_GENRE_FAILURE,
    error: error
  };
};

export const clearAnimeListGenre = () => {
  return {
    type: actionTypes.CLEAR_ANIME_LIST_GENRE
  };
};