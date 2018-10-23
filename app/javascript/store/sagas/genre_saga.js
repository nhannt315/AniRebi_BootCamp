import 'regenerator-runtime/runtime';
import { put } from 'redux-saga/effects';
import queryString from 'query-string';

import axios from '../../axios_anime';
import * as actions from '../actions/index';
import * as endpoints from '../../constants/endpoint_constants';

const delay = (ms) => new Promise(res => setTimeout(res, ms));


export function* getGenreDetail(action) {
  yield put(actions.getGenreStart());
  const params = {
    page: action.page,
    item_per_page: action.perPage
  };
  const url = `${endpoints.GET_GENRE_DETAIL}/${action.genreId}?${queryString.stringify((params))}`;
  try {
    const response = yield axios.get(url);
    yield put(actions.getGenreSuccess(response.data));
  }catch (error){
    yield put(actions.getGenreFailure(error.data));
  }
}

export function* getAnimeListGenre(action) {
  yield put(actions.getAnimeListGenreStart());
  const params = {
    page: action.page,
    item_per_page: action.perPage
  };
  yield delay(1000);
  const url = `${endpoints.getAnimeListGenre(action.genreId)}?${queryString.stringify(params)}`;
  try {
    const response = yield axios.get(url);
    yield put(actions.getAnimeListGenreSuccess(response.data));
  } catch (error) {
    yield put(actions.getAnimeListGenreFailure(error.data));
  }
}