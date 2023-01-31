import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
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
import { useEffect, useState } from "react";
import { TotalPrice } from "../TotalPrice/TotalPrice";
import { getPrice } from "../../utils/funcs";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_CONSTRUCTOR_MODAL } from "../../services/actions/constructorModal";
import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  GET_TOTAL_PRICE,
  ADD_BUN,
  ADD_INGREDIENT,
} from "../../services/actions/burgerConstructor";
import { useDrop } from "react-dnd";

export const BurgerConstructor = () => {
  const { isOpenConstructorModal } = useSelector(
    (state) => state.constructorModal
  );
  const { orderData, totalPrice } = useSelector(
    (state) => state.constructorData
  );

  const { ingredients, bun } = useSelector((state) => state.constructorData);

  const [listIdOrder, setListIdOrder] = useState([]);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_CONSTRUCTOR_MODAL });
  };

  const deleteConstructorItem = (id) => {
    const filteredIngredients = ingredients.filter((item) => item._id !== id);
    dispatch({
      type: DELETE_CONSTRUCTOR_INGREDIENT,
      ingredients: filteredIngredients,
    });
  };

  useEffect(() => {
    dispatch({
      type: GET_TOTAL_PRICE,
      totalPrice: getPrice([...ingredients, ...bun]),
    });

    setListIdOrder(
      [...ingredients, ...bun].map((item) => {
        return item._id;
      })
    );
  }, [bun, ingredients]);

  const [, drop] = useDrop({
    accept: "ingredient",
    drop({ ingredient }) {
      if (ingredient.type === "bun") {
        dispatch({ type: ADD_BUN, bun: [ingredient] });
      } else {
        dispatch({ type: ADD_INGREDIENT, ingredients: ingredient });
      }
    },
  });

  return (
    <>
      <Modal isOpenModal={isOpenConstructorModal} closeModal={closeModal}>
        <OrderDetails orderNum={orderData}></OrderDetails>
      </Modal>

      <section className={styles.content_box} ref={drop}>
        <div className={styles.burger_box}>
          <div className={styles.div_box_fixed}>
            {bun.length === 0 ? (
              <ConstructorStartViewBunTop />
            ) : (
              <BurgerBunTop isLocked={true} {...bun[0]}></BurgerBunTop>
            )}
          </div>

          <ul className={`custom-scroll ${styles.ul_box_scroll}`}>
            {ingredients.length === 0 ? (
              <li>
                <DragIcon type="primary" />
                <ConstructorStartViewBunIngredient />
              </li>
            ) : (
              ingredients.map(({ _id, image, name, price }) => {
                return (
                  <li key={_id}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={name}
                      price={price}
                      thumbnail={image}
                      handleClose={() => {
                        deleteConstructorItem(_id);
                      }}
                    ></ConstructorElement>
                  </li>
                );
              })
            )}
          </ul>
          <div className={styles.div_box_fixed}>
            {bun.length === 0 ? (
              <ConstructorStartViewBunBottom />
            ) : (
              <BurgerBunBottom isLocked={true} {...bun[0]}></BurgerBunBottom>
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
