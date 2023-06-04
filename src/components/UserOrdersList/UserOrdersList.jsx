import { FeedItem } from "../FeedItem/FeedItem";
import styles from "./UserOrdersList.module.css";

export const UserOrdersList = ({ dataOrders }) => {
  return (
    <div className={`custom-scroll ${styles.orders_list_wrap}`}>
      {dataOrders.orders.map((item, index) => {
        return (
          <FeedItem
            isUserOrderItem={true}
            orderItem={item}
            key={index}
          ></FeedItem>
        );
      })}
    </div>
  );
};
