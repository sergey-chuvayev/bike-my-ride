import { combineReducers } from 'redux';
import geoReducer from './geo-reducer';
import uiReducer from './ui-reducer';

export default combineReducers({
  geo: geoReducer,
  ui: uiReducer
});
