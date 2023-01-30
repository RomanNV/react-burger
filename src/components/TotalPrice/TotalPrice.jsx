import React, { useContext, useEffect, useState } from "react";
import styles from "./TotalPrice.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_CONSTRUCTOR_MODAL } from "../../services/actions/constructorModal";
import { getOrderNum } from "../../services/actions/burgerConstructor";

export const TotalPrice = ({ listIdOrder }) => {
  const { ingredients, bun } = useSelector(
    (state) => state.constructorData.constructorData
  );
  const [totalIngredients, setTotalIngredients] = useState([]);
  const [accPrice, setAccPrice] = useState(0);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({ type: OPEN_CONSTRUCTOR_MODAL });
  };

  const getOrder = () => {
    dispatch(getOrderNum(listIdOrder));
  };

  useEffect(() => {
    setTotalIngredients([...ingredients, bun]);
    console.log(totalIngredients);
    if (totalIngredients.length === 0) {
      return;
    } else {
      let acc = 0;
      totalIngredients.forEach((item) => {
        acc = item.type === "bun" ? item.price * 2 + acc : acc + item.price;
      });

      setAccPrice(acc);
    }
  }, [bun, ingredients]);

  return (
    <div className={styles.button_container}>
      <span className={styles.price_box}>
        <p className="text text_type_main-large">{accPrice}</p>
        <CurrencyIcon className={styles.icon} type="primary" />
      </span>
      <Button
        onClick={() => {
          openModal();
          getOrder();
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
