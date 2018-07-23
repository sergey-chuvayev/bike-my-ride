import {
  TOGGLE_MODAL
} from '../constants/action-types.js';

const initialState = {
  modalOpened: true
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { ...state, modalOpened: action.open };
    
    default:
      return state;
  }
};

export default uiReducer;