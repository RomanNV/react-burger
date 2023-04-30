import styles from "./FeedItem.module.css";
export const FeedItem = () => {
  return (
    <div className={styles.wrap_feed_item}>
      <div className={styles.content_box}>
        <div className={styles.number_order}>
          <div className={styles.time_order}>dddddddddddddd</div>
        </div>
        <div className={styles.name_order}>sssssssssssssssssssss</div>
        <div className={styles.summ_order}>sssssssssssssssssssss</div>
      </div>
    </div>
  );
};
