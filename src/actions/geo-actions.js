import * as types from '../constants/action-types.js';
import axios from 'axios';

const setPointsRequest = () => {
  return {
    type: types.GET_POINTS_REQUEST,
    isLoading: true
  };
};

const setPointsError = (error) => {
  return {
    type: types.GET_POINTS_ERROR,
    isLoading: false,
    payload: error
  };
};

const setPointsSuccess = (points) => {
  return {
    type: types.GET_POINTS_SUCCESS,
    payload: points,
    isLoading: false
  };
};

export const loadPoints = ({ gpsTopLatitude, gpsTopLongitude, gpsBotLatitude, gpsBotLongitude, zoomLevel }) => {
  return dispatch => {
    dispatch(setPointsRequest());
    axios.get('https://www.velib-metropole.fr/webapi/map/details', { params: {
      gpsTopLatitude, gpsTopLongitude, gpsBotLatitude, gpsBotLongitude, zoomLevel
    } }).then(response => response.data)
    .then((response) => dispatch(setPointsSuccess(response)))
    .catch((error) => dispatch(setPointsError(error)))
  }
}

export const loadAllPoints = () => {
  return dispatch => {
    dispatch(loadPoints({ // hardcoded whole world coordinates
      gpsTopLatitude: 180,
      gpsTopLongitude: 90,
      gpsBotLatitude: -180,
      gpsBotLongitude: -90,
      zoomLevel: 11
    }))
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



const getNearestPoints = (points) => {
  return {
    type: types.GET_NEAREST_POINTS,
    points
  }
}