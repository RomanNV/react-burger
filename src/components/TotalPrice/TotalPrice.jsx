import React, { useContext, useEffect, useState } from "react";
import styles from "./TotalPrice.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_CONSTRUCTOR_MODAL } from "../../services/actions/constructorModal";
import { getOrderNum, NOT_BUN } from "../../services/actions/totalPrice";

export const TotalPrice = ({ listIdOrder, totalPrice }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({ type: OPEN_CONSTRUCTOR_MODAL });
  };

  const getOrder = () => {
    console.log(listIdOrder);
    if (!listIdOrder.length) {
      console.log("h");
      dispatch({ type: NOT_BUN });
    } else {
      dispatch(getOrderNum(listIdOrder));
    }
  };

  return (
    <div className={styles.button_container}>
      <span className={styles.price_box}>
        <p className="text text_type_main-large">{totalPrice}</p>
        <CurrencyIcon className={styles.icon} type="primary" />
      </span>
      <Button
        onClick={() => {
          getOrder();
          openModal();
        }}
        htmlType="button"
        type="primary"
        size="large"
      >
        Оформить заказ
      </Button>
    </div>
  );
};

TotalPrice.propTypes = {
  priceData: PropTypes.array,
  getOrderNum: PropTypes.func,
};
