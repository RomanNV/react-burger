import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "../../hooks/redux-hooks";
import { getIngredientsDataFromState } from "../../services/reducers/stateFuncs";

import {
  getIngredientsArrayFromOrder,
  getIngredientsOrderWithCounter,
  getOrderParams,
} from "../../utils/funcs";
import { OrderItemComp } from "../OrderItemComp/OrderItemComp";
import styles from "./Order.module.css";

export const Order: React.FC<any> = ({
  isNotModal,
  orderData,
}): JSX.Element => {
  const { ingredients, number, createdAt, status, name } = orderData.orders[0];
  const { dataIngredients } = useSelector(getIngredientsDataFromState);
  //посчитаем сколько всего одинаковых ингредиентов и вернем массив со счетчиками
  const sortedIngredients = useMemo(() => {
    let tempIngredients = ingredients;
    let filteredItems: string[] = []; //добавляем те ингредиенты, которых уже посчитали
    return ingredients.reduce((summ: string[], item: string) => {
      if (filteredItems.includes(item)) {
        return [...summ];
      }
      if (tempIngredients.length === 1) {
        //если остался последний элемент то просто его возвращаем,
        // с счетчиком 1 так как он точно уже уникальый и единственный
        return [...summ, { item, count: 1 }];
      }
      const tempItem = item;
      filteredItems.push(item);
      const tempArr = tempIngredients.filter((id: string) => {
        return id !== tempItem;
      });

      const count = tempIngredients.length - tempArr.length; //если у нас элемент в ингредиентах уникальные возвращаем 1
      tempIngredients = tempArr;
      return [...summ, { item, count }];
    }, []);
  }, [ingredients]);

  const reducerArr = getIngredientsArrayFromOrder(ingredients, dataIngredients);
  const arrayOfOrderItemsWithCounter = getIngredientsOrderWithCounter(
    sortedIngredients,
    dataIngredients
  );
  const totalPrice = useMemo(() => {
    return reducerArr.reduce((summ, item) => {
      return (summ = item.price + summ);
    }, 0);
  }, [reducerArr]);

  const { dateString, currentStatus } = getOrderParams(createdAt, status, true);

  return (
    <div className={styles.page_wrap}>
      <div className={isNotModal ? styles.page_content : styles.modal_content}>
        <div className={styles.order_wrap}>
          <div className={styles.order_number}>
            <p className={`text text_type_digits-default`}>#{number}</p>
          </div>
          <p className="text text_type_main-medium">{name}</p>
          <p className={`text text_type_main-small ${styles.status_p}`}>
            {currentStatus}
          </p>
          <p className="text text_type_main-medium">Состав:</p>
          <div className={`custom-scroll ${styles.ingredients_wrap}`}>
            {arrayOfOrderItemsWithCounter.map((ingredient) => {
              return (
                <OrderItemComp
                  {...ingredient}
                  key={ingredient._id}
                ></OrderItemComp>
              );
            })}
          </div>
          <div className={styles.order_footer}>
            <p className="text text_type_digits-small">{dateString}</p>
            <div className={`p-1 ${styles.price_box}`}>
              <span className="text text_type_digits-default">
                {totalPrice}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
