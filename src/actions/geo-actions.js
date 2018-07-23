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

export const loadNearestPoints = (point) => {
  return (dispatch) => {
    // todo work with matrix api
    axios.get(`http://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=${process.env.REACT_APP_GOOGLE_APIS}`)
         .then(response => response.data)
         .then((response) => dispatch(getNearestPoints(response)))
  }
}

const getNearestPoints = (points) => {
  return {
    type: types.GET_NEAREST_POINTS,
    points
  }
}