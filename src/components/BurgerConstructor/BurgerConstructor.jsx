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

let initialState = {
  ingredientData: [],
  bunData: [],
  filtredData: [],
  listIdOrder: [],
  orderNum: 0,
};

export const BurgerConstructor = () => {
  const { data, toggleOrderModal, isOpenOrderModal, setError } =
    useContext(AppContext);

  const [burgerConstructorData, setBurgerConstructorData] =
    useState(initialState);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    const ingredientData = getIngredients(data);
    const bunData = getBun(data);
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
  }, [data, setBurgerConstructorData, getBun, getIngredients, getOrder]);

  const getOrderNum = (arr) => {
    return getOrder(arr)
      .then((data) => {
        setBurgerConstructorData({
          ...burgerConstructorData,
          orderNum: data.order.number,
        });
      })
      .catch((e) => {
        setError(e);
      });
  };

  return (
    <>
      <Modal isOpenModal={isOpenOrderModal} toggleModal={toggleOrderModal}>
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
            {burgerConstructorData.ingredientData.map(
              ({ _id, image, name, price }) => {
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
              }
            )}
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
