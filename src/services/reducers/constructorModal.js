import {
  OPEN_CONSTRUCTOR_MODAL,
  CLOSE_CONSTRUCTOR_MODAL,
} from "../actions/constructorModal";

const initialState = {
  isOpenConstructorModal: false,
};

export const constructorModal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CONSTRUCTOR_MODAL: {
      return { ...state, isOpenConstructorModal: true };
    }
    case CLOSE_CONSTRUCTOR_MODAL: {
      return { ...state, isOpenConstructorModal: false };
    }
    default:
      return state;
  }
};
