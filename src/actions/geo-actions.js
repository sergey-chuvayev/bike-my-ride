import * as types from '../constants/action-types.js';
import axios from 'axios';

export const setPointsRequest = () => {
  return {
    type: types.GET_POINTS_REQUEST,
    isLoading: true
  };
};

export const setPointsError = (error) => {
  return {
    type: types.GET_POINTS_ERROR,
    isLoading: false,
    payload: error
  };
};

export const setPointsSuccess = (points) => {
  return {
    type: types.GET_POINTS_SUCCESS,
    payload: points,
    isLoading: false
  };
};

export const loadPoints = ({ gpsTopLatitude, gpsTopLongitude, gpsBotLatitude, gpsBotLongitude, zoomLevel }) => {
  return (dispatch) => {
    dispatch(setPointsRequest());
    axios.get('https://www.velib-metropole.fr/webapi/map/details', { params: {
      gpsTopLatitude, gpsTopLongitude, gpsBotLatitude, gpsBotLongitude, zoomLevel
    } }).then(response => response.data)
    .then((response) => dispatch(setPointsSuccess(response)))
    .catch((error) => dispatch(setPointsError(error)))
  }
}

export const setDestination = (latLng) => {
  return {
    type: types.SET_DESTINATION,
    latLng
  }
}

export const setDeparture = (latLng) => {
  return {
    type: types.SET_DEPARTURE,
    latLng
  }
}