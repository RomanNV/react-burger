import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { BurgerBunBottom } from "../BurgerBunBottom/BurgerBunBottom";
import { BurgerBunTop } from "../BurgerBunTop/BurgerBunTop";
import {
  ConstructorStartViewBunTop,
  ConstructorStartViewBunBottom,
  ConstructorStartViewBunIngredient,
} from "../ConstructorStartViewBun/ConstructorStartView";
import { Modal } from "../Modal/Modal";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { useEffect, useMemo, useState } from "react";
import { TotalPrice } from "../TotalPrice/TotalPrice";
import {
  getPrice,
  getConstructorData,
  getConstructorModal,
} from "../../utils/funcs";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_CONSTRUCTOR_MODAL } from "../../services/actions/constructorModal";
import {
  GET_TOTAL_PRICE,
  ADD_BUN,
  ADD_INGREDIENT,
  getIngredientWithId,
} from "../../services/actions/burgerConstructor";
import { useDrop } from "react-dnd";
import { ConstructorItem } from "../ConstructorItem/ConstructorItem";

export const BurgerConstructor = () => {
  const { isOpenConstructorModal } = useSelector(getConstructorModal);
  const { ingredients, bun } = useSelector(getConstructorData);
  console.log(bun);

  const [listIdOrder, setListIdOrder] = useState([]);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_CONSTRUCTOR_MODAL });
  };
  //рассчитываем стоимость и обнавляем состояние массива id ингредиентов для заказа

  const totalPrice = useMemo(() => {
    return getPrice([...ingredients, ...bun]);
  }, [bun, ingredients]);

  useEffect(() => {
    setListIdOrder(
      [...ingredients, ...bun].map((item) => {
        return item.ingredient._id;
      })
    );
  }, [bun, ingredients]);
  //подключаем drop для поля конструктора
  const [, drop] = useDrop({
    accept: "ingredient",
    drop({ ingredient }) {
      if (ingredient.type === "bun") {
        dispatch({ type: ADD_BUN, bun: { ingredient } });
      } else {
        dispatch({
          type: ADD_INGREDIENT,
          ingredients: getIngredientWithId(ingredient),
        });
      }
    },
  });

  return (
    <>
      <Modal isOpenModal={isOpenConstructorModal} closeModal={closeModal}>
        <OrderDetails></OrderDetails>
      </Modal>

      <section className={styles.content_box} ref={drop}>
        <div className={styles.burger_box}>
          <div className={styles.div_box_fixed}>
            {bun.length === 0 ? (
              <ConstructorStartViewBunTop />
            ) : (
              <BurgerBunTop {...bun[0]["ingredient"]}></BurgerBunTop>
            )}
          </div>

          <ul className={`custom-scroll ${styles.ul_box_scroll}`}>
            {ingredients.length === 0 ? (
              <li>
                <DragIcon type="primary" />
                <ConstructorStartViewBunIngredient />
              </li>
            ) : (
              ingredients.map((item, index) => {
                const { itemId } = item;
                return (
                  <ConstructorItem
                    key={itemId}
                    item={item}
                    index={index}
                  ></ConstructorItem>
                );
              })
            )}
          </ul>
          <div className={styles.div_box_fixed}>
            {bun.length === 0 ? (
              <ConstructorStartViewBunBottom />
            ) : (
              <BurgerBunBottom {...bun[0]["ingredient"]}></BurgerBunBottom>
            )}
          </div>
          <TotalPrice
            listIdOrder={bun.length === 0 ? [] : listIdOrder}
            totalPrice={totalPrice}
          ></TotalPrice>
        </div>
      </section>
    </>
  );
};
