import { all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import {
  loginSaga,
  logoutSaga,
  authCheckStateSaga,
  signUpSaga
} from "./auth_saga";

import { getTopAnime, getGenresList, getGenreTop } from "./anime_saga";

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.LOGIN, loginSaga),
    takeLatest(actionTypes.LOGOUT, logoutSaga),
    takeLatest(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    takeLatest(actionTypes.SIGN_UP, signUpSaga)
  ]);
}

export function* watchAnime() {
  yield all([
    takeLatest(actionTypes.GET_TOP_ANIME, getTopAnime),
    takeLatest(actionTypes.GET_GENRES_LIST, getGenresList),
    takeLatest(actionTypes.GET_GENRE_TOP, getGenreTop)
  ]);
}
