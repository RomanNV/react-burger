import { GET_ORDER_ITEM } from "../actions/order";
export interface InitStateOrder {
  orderItem: any;
}
const initialState = {
  orderItem: {},
};

export const orderReducer = (
  state = initialState,
  action: any
): InitStateOrder => {
  switch (action.type) {
    case GET_ORDER_ITEM: {
      return { ...state, orderItem: action.payload };
    }
    default:
      return state;
  }
};
