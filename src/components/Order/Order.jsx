import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/redux-hooks";
import { getIngredientsDataFromState } from "../../services/reducers/stateFuncs";
import { OrderItemWithToggleModal } from "../../types/commonTypes";
import {
  getIngredientsArrayFromOrder,
  getOrderParams,
} from "../../utils/funcs";
import { OrderItem } from "../OrderItem/OrderItem";
import styles from "./Order.module.css";

export const Order = ({ orderData, isNotModal }) => {
  const { ingredients, number, _id, createdAt, status, name } =
    orderData.orders[0];
  const { dataIngredients } = useSelector(getIngredientsDataFromState);
  const reducerArr = getIngredientsArrayFromOrder(ingredients, dataIngredients);
  const totalPrice = useMemo(() => {
    return reducerArr.reduce((summ, item) => {
      return (summ = item.price + summ);
    }, 0);
  }, [reducerArr]);
  const location = useLocation();

  const { dateString, currentStatus } = getOrderParams(createdAt, status, true);

  return (
    <div className={styles.page_content}>
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
          {reducerArr.map((ingredient) => {
            return (
              <OrderItem
                ingredient={ingredient}
                key={Math.random()}
                totalPrice={0}
              ></OrderItem>
            );
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
