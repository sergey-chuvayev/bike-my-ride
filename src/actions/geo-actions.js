import * as types from '../constants/action-types.js';
import axios from 'axios';

export const setPoints = (points) => {
    return {
        type: types.GET_POINTS,
        points
    };
};

export const loadPoints = ({ gpsTopLatitude, gpsTopLongitude, gpsBotLatitude, gpsBotLongitude, zoomLevel }) => {
    return (dispatch) => {
        axios.get('https://www.velib-metropole.fr/webapi/map/details', { params: {
            gpsTopLatitude, gpsTopLongitude, gpsBotLatitude, gpsBotLongitude, zoomLevel
        } }).then((respond) => {
            dispatch(setPoints(respond.data));
        })
    }
}