import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "../../hooks/redux-hooks";
import { getIngredientsDataFromState } from "../../services/reducers/stateFuncs";
import { OrderItemImage } from "../OrderItemImage/OrderItemImage";
import styles from "./FeedItem.module.css";
export const FeedItem = ({ ingredients, number, _id }) => {
  const { dataIngredients } = useSelector(getIngredientsDataFromState);
  const reducerArr = ingredients.reduce((summ, id) => {
    const orderItem = dataIngredients.find((item) => {
      return item._id === id;
    });
    if (orderItem) {
      return [...summ, orderItem];
    }
    return null;
  }, []);
  const totalPrice = useMemo(() => {
    return reducerArr.reduce((summ, item) => {
      return (summ = item.price + summ);
    }, 0);
  }, [reducerArr]);
  const ingredientCount = reducerArr.length - 6;
  const mapIconsList = reducerArr.slice(0, 6);

  return (
    <div className={styles.wrap_feed_item}>
      <div className={styles.content_box}>
        <div className={styles.item_header}>
          <p className={`text text_type_digits-medium ${styles.number}`}>
            {number}
          </p>
          <div className={styles.time}>ddddssd</div>
        </div>
        <div className="text text_type_main-large">sssssssssssssssssssss</div>
        <div className={styles.order_components}>
          <div className={styles.list_component_icons}>
            {mapIconsList.map((ingredient, index) => {
              const zIndex = ingredients.length - index;
              return (
                <OrderItemImage
                  ingredientCount={ingredientCount}
                  ingredient={ingredient}
                  index={index}
                  className={styles.item_icons}
                  zIndex={zIndex}
                  key={index}
                ></OrderItemImage>
              );
            })}
          </div>
          <div className={`p-1 ${styles.price_box}`}>
            <CurrencyIcon type="primary" />
            <span className="text text_type_digits-default">{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
