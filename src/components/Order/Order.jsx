import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/redux-hooks";
import { getIngredientsDataFromState } from "../../services/reducers/stateFuncs";
import { OrderItemWithToggleModal } from "../../types/commonTypes";
import {
  getIngredientsArrayFromOrder,
  getIngredientsOrderWithCounter,
  getOrderParams,
} from "../../utils/funcs";
import { OrderItem } from "../OrderItem/OrderItem";
import styles from "./Order.module.css";

export const Order = ({ orderData, isNotModal }) => {
  const { ingredients, number, _id, createdAt, status, name } =
    orderData.orders[0];
  const { dataIngredients } = useSelector(getIngredientsDataFromState);
  //посчитаем сколько всего одинаковых ингредиентов и вернем массив со счетчиками
  const sortedIngredients = useMemo(() => {
    let tempIngredients = ingredients;
    let filteredItems = []; //добавляем те ингредиенты, которых уже посчитали
    return ingredients.reduce((summ, item) => {
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
      const tempArr = tempIngredients.filter((id) => {
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
            return <OrderItem {...ingredient} key={ingredient._id}></OrderItem>;
          })}
        </div>
        <div className={styles.order_footer}>
          <p className="text text_type_digits-small">{dateString}</p>
          <div className={`p-1 ${styles.price_box}`}>
            <span className="text text_type_digits-default">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
