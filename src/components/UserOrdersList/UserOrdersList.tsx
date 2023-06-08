import { InitWs } from "../../services/reducers/wsReducer";
import { OrderItem } from "../../types/commonTypes";
import { FeedItem } from "../FeedItem/FeedItem";
import styles from "./UserOrdersList.module.css";

export const UserOrdersList: React.FC<InitWs> = ({ orders }): JSX.Element => {
  return (
    <div className={`custom-scroll ${styles.orders_list_wrap}`}>
      {orders.map((item: OrderItem, index: number) => {
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
