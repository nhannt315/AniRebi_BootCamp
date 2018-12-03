import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import authReducer from './reducers/auth_reducer';
import animeReducer from './reducers/anime_reducer';
import searchReducer from './reducers/search_reducer';
import genreReducer from './reducers/genre_reducer';
import { watchAuth, watchAnime, watchSearch, watchGenre, watchUserProfile } from './sagas';

const composeEnhancers = compose;

const rootReducer = combineReducers({
  auth: authReducer,
  anime: animeReducer,
  search: searchReducer,
  genre: genreReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchAnime);
sagaMiddleware.run(watchSearch);
sagaMiddleware.run(watchGenre);

export default store;
