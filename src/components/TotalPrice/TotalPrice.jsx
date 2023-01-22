import React, { useContext, useEffect, useState } from "react";
import styles from "./TotalPrice.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppContext } from "../../utils/AppContext";
import PropTypes from "prop-types";

export const TotalPrice = ({ priceData, getOrderNum }) => {
  const [accPrice, setAccPrice] = useState(0);
  const { toggleOrderModal } = useContext(AppContext);

  useEffect(() => {
    if (priceData.length === 0) {
      return;
    } else {
      let acc = 0;
      priceData.forEach((item) => {
        acc = item.type === "bun" ? item.price * 2 + acc : acc + item.price;
      });
      setAccPrice(acc);
    }
  }, [priceData]);

  return (
    <div className={styles.button_container}>
      <span className={styles.price_box}>
        <p className="text text_type_main-large">{accPrice}</p>
        <CurrencyIcon className={styles.icon} type="primary" />
      </span>
      <Button
        onClick={() => {
          toggleOrderModal();
          getOrderNum();
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
};
