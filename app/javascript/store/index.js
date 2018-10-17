import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import authReducer from './reducers/auth_reducer';
import animeReducer from './reducers/anime_reducer';
import searchReducer from './reducers/search_reducer';
import { watchAuth, watchAnime, watchSearch } from './sagas';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  anime: animeReducer,
  search: searchReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchAnime);
sagaMiddleware.run(watchSearch);

export default store;
