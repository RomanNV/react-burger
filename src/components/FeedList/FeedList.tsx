import { dataOrders, OrderItem } from "../../types/commonTypes";
import { FeedItem } from "../FeedItem/FeedItem";
import styles from "./FeedList.module.css";

export const FeedList: React.FC<dataOrders | any> = ({
  dataOrders,
}): JSX.Element => {
  return (
    <section className={styles.feed_list_box}>
      <header className={`text text_type_main-large ${styles.feed_header}`}>
        Лента Заказов
      </header>
      <div className={`custom-scroll ${styles.feed_list}`}>
        {dataOrders.map((item: OrderItem, index: number) => {
          return (
            <FeedItem
              orderItem={item}
              key={index}
              isUserOrderItem={false}
            ></FeedItem>
          );
        })}
      </div>
    </section>
  );
};
