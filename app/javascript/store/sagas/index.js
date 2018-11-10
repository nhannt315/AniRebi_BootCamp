import { all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {
  loginSaga,
  logoutSaga,
  authCheckStateSaga,
  signUpSaga,
  forgotPasswordSaga,
  resetPasswordSaga,
  fetchUserInfo,
  updateUserInfo
} from './auth_saga';

import {
  getTopAnime,
  getAnimeById,
  getGenresList,
  getGenreTop,
  getMultipleGenreTop,
  getReviewsByAnime
} from './anime_saga';

import { searchAnimeSaga } from './search_saga';

import { getGenreDetail, getAnimeListGenre } from './genre_saga';


export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.LOGIN, loginSaga),
    takeLatest(actionTypes.LOGOUT, logoutSaga),
    takeLatest(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    takeLatest(actionTypes.SIGN_UP, signUpSaga),
    takeLatest(actionTypes.AUTH_FORGOT_PASSWORD, forgotPasswordSaga),
    takeLatest(actionTypes.AUTH_RESET_PASSWORD, resetPasswordSaga),
    takeLatest(actionTypes.GET_USER_PROFILE_INFO, fetchUserInfo),
    takeLatest(actionTypes.PATH_UPDATE_PROFILE, updateUserInfo)
  ]);
}

export function* watchAnime() {
  yield all([
    takeLatest(actionTypes.GET_TOP_ANIME, getTopAnime),
    takeLatest(actionTypes.GET_ANIME_BY_ID, getAnimeById),
    takeLatest(actionTypes.GET_GENRES_LIST, getGenresList),
    takeLatest(actionTypes.GET_GENRE_TOP, getGenreTop),
    takeLatest(actionTypes.GET_MULTIPLE_GENRE_TOP, getMultipleGenreTop),
    takeLatest(actionTypes.GET_REVIEWS_BY_ANIME, getReviewsByAnime)
  ]);
}

export function* watchSearch() {
  yield all([takeLatest(actionTypes.SEARCH_ANIME_REQUEST, searchAnimeSaga)]);
}

export function* watchGenre() {
  yield all([
    takeLatest(actionTypes.GET_GENRE_DETAIL, getGenreDetail),
    takeLatest(actionTypes.GET_ANIME_LIST_GENRE, getAnimeListGenre)
  ]);
}
