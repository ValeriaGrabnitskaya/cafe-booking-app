import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import dictionaryReducer from '../reducers/dictionaryReducer';
import placesReducer from '../reducers/placesReducer';

const store = createStore(
  combineReducers({
    dictionaryReducer: dictionaryReducer,
    placesReducer: placesReducer
  }),
  applyMiddleware(thunk)
);

export default store;