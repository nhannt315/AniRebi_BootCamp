import "regenerator-runtime/runtime";
import { put } from "redux-saga/effects";
import axios from "../../axios_anime";
import * as actions from "../actions/index";
import * as endpoints from "../../constants/endpoint_constants";

export function* getTopAnime(action) {
  console.log("getTopAnime");
  yield put(actions.getTopAnimeStart());
  try {
    url = endpoints.GET_GENRE_TOP_ANIMES;
    if (action.page) url += `?page=${action.page}`;
    if (action.itemPerPage) url += `?item_per_page=${action.itemPerPage}`;
    const response = yield axios.get(url);
    yield put(actions.getTopAnimeSuccess(response));
  } catch (error) {
    yield put(actions.getTopAnimeFailure(error.response.data.errors));
  }
}

export function* getGenresList(action) {
  yield put(actions.getGenresListStart());
  try {
    url = endpoinst.GET_GENRES_LIST;
    if (action.page) url += `?page=${action.page}`;
    if (action.itemPerPage) url += `?item_per_page=${action.itemPerPage}`;
    const response = yield axios.get(url);
    yield put(actions.getGenresListSuccess(response));
  } catch (error) {
    yield put(actions.getGenresListFailure(error.response.data.errors));
  }
}

export function* getGenreTop(action) {
  yield put(actions.getGenreTopStart());
  try {
    url = endpoints.GET_GENRE_TOP + `/${action.id}`;
    if (action.limit) url += `?limit=${action.limit}`;
    const response = yield axios.get(
      endpoints.GET_GENRE_TOP + "?limit=" + action.limit
    );
    yield put(actions.getGenreTopSuccess(response));
  } catch (error) {
    yield put(actions.getGenreTopFailure(error.response.data.errors));
  }
}
