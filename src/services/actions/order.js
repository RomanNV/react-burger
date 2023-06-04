export const GET_ORDER_ITEM = "GET_ORDER_ITEM";

export function getOrderItem(orderItem) {
  return { type: GET_ORDER_ITEM, payload: orderItem };
}
