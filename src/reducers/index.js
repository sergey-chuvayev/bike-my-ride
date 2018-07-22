import { combineReducers } from 'redux';
import geoReducer from './geo-reducer';

export default combineReducers({
  geo: geoReducer
});
