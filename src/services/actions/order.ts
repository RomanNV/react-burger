import { OrderItem } from "../../types/commonTypes";

export const GET_ORDER_ITEM: "GET_ORDER_ITEM" = "GET_ORDER_ITEM";

export interface IgetOrderItem {
  type: typeof GET_ORDER_ITEM;
  payload: OrderItem;
}
export const getOrderItem = (orderItem: OrderItem): IgetOrderItem => {
  return { type: GET_ORDER_ITEM, payload: orderItem };
};
