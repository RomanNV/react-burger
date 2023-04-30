import { FeedItem } from "../FeedItem/FeedItem";
import styles from "./FeedList.module.css";
const arr = [1, 2, 3, 4, 5, 6, 7];

export const FeedList = () => {
  return (
    <div className={styles.feed_list_box}>
      <header className={`text text_type_main-large ${styles.feed_header}`}>
        Лента Заказов
      </header>
      <div className={`custom-scroll ${styles.feed_list}`}>
        {arr.map(() => {
          return <FeedItem></FeedItem>;
        })}
      </div>
    </div>
  );
};
