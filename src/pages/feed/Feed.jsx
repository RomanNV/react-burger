import { useEffect } from "react";
import { FeedList } from "../../components/FeedList/FeedList";
import { FeedOrders } from "../../components/FeedOrders/FeedOrders";
import { dataOrders } from "../../utils/mockesData";
import styles from "./Feed.module.css";

export const Feed = () => {
  useEffect(() => {});
  return (
    <div className={styles.content_container}>
      <FeedList dataOrders={dataOrders}></FeedList>
      <FeedOrders></FeedOrders>
    </div>
  );
};
