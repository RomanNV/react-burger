import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { BurgerBunBottom } from "../BurgerBunBottom/BurgerBunBottom";
import { BurgerBunTop } from "../BurgerBunTop/BurgerBunTop";
import { Modal } from "../Modal/Modal";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { AppContext } from "../../utils/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { TotalPrice } from "../TotalPrice/TotalPrice";
import { getIngredients, getBun, getOrder } from "../../utils/funcs";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_CONSTRUCTOR_MODAL } from "../../services/actions/constructorModal";

let initialState = {
  ingredientData: [],
  bunData: [],
  filtredData: [],
  listIdOrder: [],
  orderNum: 0,
};

export const BurgerConstructor = () => {
  const { isOpenConstructorModal } = useSelector(
    (state) => state.constructorModal
  );

  const { dataIngredients } = useSelector((state) => state.ingredientsData);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_CONSTRUCTOR_MODAL });
  };
  const [burgerConstructorData, setBurgerConstructorData] =
    useState(initialState);

  useEffect(() => {
    if (dataIngredients.length === 0) {
      return;
    }
    const ingredientData = getIngredients(dataIngredients);
    const bunData = getBun(dataIngredients);
    const filtredData = [...ingredientData, bunData];
    const listIdOrder = filtredData.map((item) => {
      return item._id;
    });
    setBurgerConstructorData({
      ...burgerConstructorData,
      ingredientData,
      bunData,
      filtredData,
      listIdOrder,
    });
  }, [
    dataIngredients,
    setBurgerConstructorData,
    getBun,
    getIngredients,
    getOrder,
  ]);

  const getOrderNum = (arr) => {
    return getOrder(arr)
      .then((data) => {
        setBurgerConstructorData({
          ...burgerConstructorData,
          orderNum: data.order.number,
        });
      })
      .catch((e) => {});
  };

  return (
    <>
      <Modal isOpenModal={isOpenConstructorModal} closeModal={closeModal}>
        <OrderDetails orderNum={burgerConstructorData.orderNum}></OrderDetails>
      </Modal>

      <section className={styles.content_box}>
        <div className={styles.burger_box}>
          <div className={styles.div_box_fixed}>
            <BurgerBunTop
              isLocked={true}
              {...burgerConstructorData.bunData}
            ></BurgerBunTop>
          </div>

          <ul className={`custom-scroll ${styles.ul_box_scroll}`}>
            {dataIngredients.map(({ _id, image, name, price }) => {
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
            })}
          </ul>
          <div className={styles.div_box_fixed}>
            <BurgerBunBottom
              isLocked={true}
              {...burgerConstructorData.bunData}
            ></BurgerBunBottom>
          </div>
          <TotalPrice
            priceData={burgerConstructorData.filtredData}
            getOrderNum={() => getOrderNum(burgerConstructorData.listIdOrder)}
          ></TotalPrice>
        </div>
      </section>
    </>
  );
};
