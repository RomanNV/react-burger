import {
  OPEN_CONSTRUCTOR_MODAL,
  CLOSE_CONSTRUCTOR_MODAL,
  constructorModalActions,
} from "../actions/constructorModal";

export interface InitStateConstructorModal {
  isOpenConstructorModal: boolean;
}
const initialState = {
  isOpenConstructorModal: false,
};

export const constructorModal = (
  state = initialState,
  action: constructorModalActions
): InitStateConstructorModal => {
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
