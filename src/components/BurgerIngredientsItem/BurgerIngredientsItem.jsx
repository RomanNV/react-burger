import styles from "./BurgerIngredientsItem.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useEffect } from "react";

export function BurgerIngredientsItem({
  name,
  price,
  image,
  isCounter,
  getDataIngredient,
  openModal,
}) {
  useEffect(() => {});
  return (
    <div
      className={styles.ingredient_box}
      onClick={() => {
        openModal();
        getDataIngredient();
      }}
    >
      <img src={image} alt="фото ингредиента" />
      {isCounter && <Counter count={1} size="default" extraClass="m-1" />}
      <div className={`p-1 ${styles.price_box}`}>
        <CurrencyIcon type="primary" />
        <span className="text text_type_digits-default">{price}</span>
      </div>
      <p className={`text text_type_main-default ${styles.ingredient_name}`}>
        {name}
      </p>
    </div>
  );
}
BurgerIngredientsItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  isCounter: PropTypes.bool,
};
