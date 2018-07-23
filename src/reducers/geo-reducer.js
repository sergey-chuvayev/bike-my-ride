import {
  GET_POINTS_ERROR,
  GET_POINTS_SUCCESS,
  GET_POINTS_REQUEST,
  SET_DESTINATION,
  SET_DEPARTURE,
} from '../constants/action-types.js';

const initialState = {
  points: [],
  destination: {},
  departure: {}
}

const geoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POINTS_SUCCESS:
      return { ...state, isLoading: false, points: action.payload };
    
    case GET_POINTS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    
    case GET_POINTS_REQUEST:
      return { ...state, isLoading: true, error: null };
    
    case SET_DESTINATION:
      return { ...state, destination: action.latLng }

    case SET_DEPARTURE:
      return { ...state, departure: action.latLng }
    
    default:
      return state;
  }
};

export default geoReducer;