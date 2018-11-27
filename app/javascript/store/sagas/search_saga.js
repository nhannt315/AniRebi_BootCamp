import 'regenerator-runtime/runtime';
import { put } from 'redux-saga/effects';
import queryString from 'query-string';

import axios from '../../axios_anime';
import * as actions from '../actions/index';
import * as endpoints from '../../constants/endpoint_constants';

export function* searchAnimeSaga({payload}) {
  console.log(payload.conditions);
  yield put(actions.searchAnimeStart(payload));
  const query = {
    q: payload.q,
    page: payload.page,
    item_per_page: payload.itemPerPage
  };
  const url = `${endpoints.SEARCH_ANIME}?${queryString.stringify(query)}`;
  try {
    const response = yield axios.get(url);
    yield put(actions.searchAnimeSuccess({searchResult: response.data}));
  } catch (error) {
    yield put(actions.searchAnimeFalure(error));
  }
}