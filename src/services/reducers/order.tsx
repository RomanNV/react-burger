import { GET_ORDER_ITEM } from "../actions/order";
export interface InitStateOrder {
  orderItem: any;
}
export const initialState = {
  orderItem: null,
};

export const orderReducer = (
  state = initialState,
  action: any
): InitStateOrder => {
  switch (action.type) {
    case GET_ORDER_ITEM: {
      console.log(JSON.stringify(action.payload));

      return { ...state, orderItem: action.payload };
    }
    default:
      return state;
  }
};
