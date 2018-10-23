import * as actionTypes from '../actions/actionTypes';

const initialState = {
  genreDetail: {},
  genreDetailLoading: false,
  genreDetailError: null,
  animeList: [],
  animeListPage: 1,
  animeListLoading: false,
  animeListError: null,
  totalAnime: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GENRE_DETAIL_START:
      return {...state, genreDetailLoading: true};
    case actionTypes.GET_GENRE_DETAIL_SUCCESS:
      return {...state, genreDetail: action.data, genreDetailLoading: false};
    case actionTypes.GET_GENRE_DETAIL_FAILURE:
      return {...state, genreDetailError: action.error, genreDetailLoading: false};
    case actionTypes.GET_ANIME_LIST_GENRE_START:
      return {...state, animeListLoading: true};
    case actionTypes.GET_ANIME_LIST_GENRE_SUCCESS:
      return {
        ...state,
        animeList: [...state.animeList, ...action.data.animes],
        animeListPage: state.animeListPage + 1,
        animeListLoading: false,
        totalAnime: action.data.total
      };
    case actionTypes.GET_ANIME_LIST_GENRE_FAILURE:
      return {...state, animeListError: action.error, animeListLoading: false};
    case actionTypes.CLEAR_ANIME_LIST_GENRE:
      return {
        ...state,
        animeList: [],
        animeListPage: 1
      };
    default:
      return state;
  }
};

export default reducer;