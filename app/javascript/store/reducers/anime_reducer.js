import * as actionTypes from "../actions/actionTypes";

const initialState = {
  topAnimeData: {},
  genresListData: {},
  genreTopData: {},
  errors: [],
  isProcessing: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOP_ANIME_START:
    case actionTypes.GET_GENRES_LIST_START:
    case actionTypes.GET_GENRE_TOP_START:
      return { ...state, isProcessing: true };
    case actionTypes.GET_TOP_ANIME_SUCCESS:
      return { ...state, topAnimeData: action.data, isProcessing: false };
    case actionTypes.GET_GENRES_LIST_SUCCES:
      return { ...state, genresListData: action.data, isProcessing: false };
    case actionTypes.GET_GENRE_TOP_SUCCESS:
      return { ...state, genreTopData: action.data, isProcessing: false };
    default:
      return state;
  }
};

export default reducer;
