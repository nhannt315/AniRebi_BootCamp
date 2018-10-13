import * as actionTypes from "../actions/actionTypes";

const initialState = {
  topAnimeData: {},
  genresListData: {},
  genreTopData: {},
  multipleGenreTopData: [],
  errors: [],
  topAnimeIsProcessing: true,
  genresListIsProcessing: true,
  genreTopIsProcessing: true,
  multipleGenreTopIsProcessing: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOP_ANIME_START:
      return { ...state, topAnimeIsProcessing: true };
    case actionTypes.GET_GENRES_LIST_START:
      return { ...state, genresListIsProcessing: true };
    case actionTypes.GET_GENRE_TOP_START:
      return { ...state, genreTopIsProcessing: true };
    case actionTypes.GET_MULTIPLE_GENRE_TOP_START:
      return { ...state, multipleGenreTopIsProcessing: true };
    case actionTypes.GET_TOP_ANIME_SUCCESS:
      return {
        ...state,
        topAnimeData: action.data,
        topAnimeIsProcessing: false
      };
    case actionTypes.GET_GENRES_LIST_SUCCESS:
      return {
        ...state,
        genresListData: action.data,
        genresListIsProcessing: false
      };
    case actionTypes.GET_GENRE_TOP_SUCCESS:
      return {
        ...state,
        genreTopData: action.data,
        genreTopIsProcessing: false
      };
    case actionTypes.GET_MULTIPLE_GENRE_TOP_SUCCESS:
      return {
        ...state,
        multipleGenreTopData: action.data,
        multipleGenreTopIsProcessing: false
      };
    default:
      return state;
  }
};

export default reducer;
