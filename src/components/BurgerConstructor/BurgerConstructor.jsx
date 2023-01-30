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
import { getIngredients, getBun, getOrder } from "../../utils/funcs";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_CONSTRUCTOR_MODAL } from "../../services/actions/constructorModal";
import { GET_CONSTRUCTOR_DATA } from "../../services/actions/burgerConstructor";

export const BurgerConstructor = () => {
  const { isOpenConstructorModal } = useSelector(
    (state) => state.constructorModal
  );
  const { dataIngredients } = useSelector((state) => state.ingredientsData);
  // const dataIngredients = [];
  const { ingredients, bun } = useSelector(
    (state) => state.constructorData.constructorData
  );
  const { orderData } = useSelector((state) => state.constructorData);
  const [listIdOrder, setListIdOrder] = useState([]);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_CONSTRUCTOR_MODAL });
  };

  useEffect(() => {
    if (dataIngredients.length === 0) {
      return;
    }
    dispatch({
      type: GET_CONSTRUCTOR_DATA,
      bun: [getBun(dataIngredients)],
      ingredients: getIngredients(dataIngredients),
    });
    setListIdOrder(
      [...ingredients, bun].map((item) => {
        return item._id;
      })
    );
  }, [dataIngredients]);

  return (
    <>
      <Modal isOpenModal={isOpenConstructorModal} closeModal={closeModal}>
        <OrderDetails orderNum={orderData}></OrderDetails>
      </Modal>

      <section className={styles.content_box}>
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
          <TotalPrice listIdOrder={listIdOrder}></TotalPrice>
        </div>
      </section>
    </>
  );
};
