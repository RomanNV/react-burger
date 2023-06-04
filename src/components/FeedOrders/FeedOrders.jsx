import { useMemo } from "react";
import { OrderNumberColumn } from "../OrderNumberColumn/OrderNumberColumn";
import styles from "./FeedOrders.module.css";

export const FeedOrders = ({ dataOrders }) => {
  const { orders, totalToday, total } = dataOrders;

  const doneOrdersArray = useMemo(() => {
    return orders.filter((item) => {
      return item.status === "done";
    });
  }, [orders]);

  const getCountOfOrders = (arr) => {
    const tempArr = [...arr];
    const tempArrayTwoMeric = [];
    const spliceArr = (arrs) => {
      return arrs.splice(0, 9);
    };
    while (tempArr.length) {
      const tempArrayOfCuttedArr = spliceArr(tempArr);
      tempArrayTwoMeric.push(tempArrayOfCuttedArr);
    }
    return tempArrayTwoMeric;
  };

  const prepareOrdersArray = useMemo(() => {
    return orders.filter((item) => {
      return item.status !== "done";
    });
  }, [dataOrders]);
  const columnDoneOrdersArray = getCountOfOrders(doneOrdersArray);
  const columnPrepareOrdersArray = getCountOfOrders(prepareOrdersArray);

  return (
    <section className={styles.feed_orders_box}>
      <div className={styles.wrap_content}>
        <div className={styles.orders}>
          <div className={styles.orders_done}>
            <p className="text text_type_main-large">Готовы:</p>
            <div className={`custom-scroll ${styles.column_wrap}`}>
              {columnDoneOrdersArray.map((item, index) => {
                return (
                  <OrderNumberColumn
                    key={index}
                    doneOrdersArray={item}
                  ></OrderNumberColumn>
                );
              })}
            </div>
          </div>
          <div className={styles.orders_prepare}>
            <p className="text text_type_main-large">В работе:</p>
            <div className={`custom-scroll ${styles.column_wrap}`}>
              {columnPrepareOrdersArray.map((item, index) => {
                return (
                  <OrderNumberColumn
                    key={index}
                    doneOrdersArray={item}
                  ></OrderNumberColumn>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.total_orders_count_wrap}>
          <p className="text text_type_main-large">Выполнено за все время:</p>
          <p className="text text_type_digits-large">{total}</p>
        </div>
        <div className={styles.today_orders_count_wrap}>
          <p className="text text_type_main-large">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </section>
  );
};
