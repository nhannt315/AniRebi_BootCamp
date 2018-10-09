import "regenerator-runtime/runtime";
import { put } from "redux-saga/effects";
import axios from "../../axios_anime";
import * as actions from "../actions/index";
import * as endpoints from "../../constants/endpoint_constants";

export function* getTopAnime(action) {
  yield put(actions.getTopAnimeStart());
  try {
    let url = endpoints.GET_TOP_ANIMES;
    if (action.page) url += `?page=${action.page}`;
    if (action.itemPerPage) url += `&item_per_page=${action.itemPerPage}`;
    // console.log(url);
    const response = yield axios.get(url);
    // console.log(response.data);
    yield put(actions.getTopAnimeSuccess(response.data));
  } catch (error) {
    console.log(error);
    yield put(actions.getTopAnimeFailure(error.response.data.errors));
  }
}

export function* getGenresList(action) {
  yield put(actions.getGenresListStart());
  try {
    let url = endpoints.GET_GENRES_LIST;
    if (action.page) url += `?page=${action.page}`;
    if (action.itemPerPage) url += `&item_per_page=${action.itemPerPage}`;
    // console.log(url);
    const response = yield axios.get(url);
    // console.log(response.data);
    yield put(actions.getGenresListSuccess(response.data));
  } catch (error) {
    console.log(error);
    yield put(actions.getGenresListFailure(error.response.data.errors));
  }
}

export function* getGenreTop(action) {
  yield put(actions.getGenreTopStart());
  try {
    let url = endpoints.GET_GENRE_TOP + `/${action.id}`;
    if (action.limit) url += `?limit=${action.limit}`;
    // console.log(url);
    const response = yield axios.get(url);
    // console.log(response.data);
    yield put(actions.getGenreTopSuccess(response.data));
  } catch (error) {
    console.log(error);
    yield put(actions.getGenreTopFailure(error.response.data.errors));
  }
}
