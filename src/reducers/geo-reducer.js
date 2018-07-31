import { config } from '../config'

import {
  GET_POINTS_ERROR,
  GET_POINTS_SUCCESS,
  GET_POINTS_REQUEST,
  SET_DESTINATION,
  SET_DEPARTURE,
  GET_NEAREST_POINTS,
} from '../constants/action-types.js';

const initialState = {
  points: [],
  nearestPoints: [],
  destination: {},
  departure: config.map.center
}

const geoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POINTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        points: action.payload.map(point => {
          return {
            lat: point.station.gps.latitude,
            lng: point.station.gps.longitude
          }
        })
      };
    }
    
    case GET_POINTS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    
    case GET_POINTS_REQUEST:
      return { ...state, isLoading: true, error: null };
    
    case SET_DESTINATION:
      return { ...state, destination: { ...state.destination, ...action.latLng } }

    case SET_DEPARTURE:
      return { ...state, departure: { ...state.departure, ...action.latLng } }

    case GET_NEAREST_POINTS:
      return { ...state, nearestPoints: action.points };
    
    default:
      return state;
  }
};

export default geoReducer;