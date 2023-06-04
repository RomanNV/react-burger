import styles from "./OrderNumberColumn.module.css";
export const OrderNumberColumn = ({ doneOrdersArray }) => {
  return (
    <div className={styles.column_done_wrap}>
      {doneOrdersArray.map((item, index) => {
        return (
          <p
            key={index}
            className={`text text_type_digits-medium ${styles.number_done_orders_p}`}
          >
            {item.number}
          </p>
        );
      })}
    </div>
  );
};
