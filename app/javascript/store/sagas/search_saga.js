import 'regenerator-runtime/runtime';
import { put } from 'redux-saga/effects';
import queryString from 'query-string';

import axios from '../../axios_anime';
import * as actions from '../actions/index';
import * as endpoints from '../../constants/endpoint_constants';

export function* searchAnimeSaga({payload}) {
  console.log(payload.conditions);
  yield put(actions.searchAnimeStart(payload));
  let query = {
    q: payload.q,
    page: payload.page,
    item_per_page: payload.itemPerPage
  };
  if(payload.conditions){
    query = {
      ...query,
      arr: payload.conditions.genreList,
      start: payload.conditions.createdDate[0],
      end: payload.conditions.createdDate[1],
      status: payload.conditions.status
    };
  }
  const url = `${endpoints.SEARCH_ANIME}?${queryString.stringify(query)}`;
  console.log(url);
  try {
    const response = yield axios.get(url);
    yield put(actions.searchAnimeSuccess({searchResult: response.data}));
  } catch (error) {
    yield put(actions.searchAnimeFalure(error));
  }
}