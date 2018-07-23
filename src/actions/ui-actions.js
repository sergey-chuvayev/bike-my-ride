import * as types from '../constants/action-types.js';

export const toggleModal = (open) => {
  return {
    type: types.TOGGLE_MODAL,
    open
  };
};