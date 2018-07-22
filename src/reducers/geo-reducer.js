import { GET_POINTS } from '../constants/action-types.js';

const initialState = {
    points: []
}

const geoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POINTS:
            return { ...state, points: [...state.points, action.points] };

        default:
            return state;
    }
};

export default geoReducer;