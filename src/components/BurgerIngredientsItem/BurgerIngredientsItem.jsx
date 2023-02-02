import styles from "./BurgerIngredientsItem.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_INGREDIENT_MODAL } from "../../services/actions/ingredientModal";
import { GET_VIEW_ITEM } from "../../services/actions/burgerIngredients";
import { useDrag } from "react-dnd";
import { useEffect, useState } from "react";

export function BurgerIngredientsItem({ ingredient, setBunId, bunId }) {
  const { name, price, image, _id, type } = ingredient;
  const { ingredients, bun } = useSelector((state) => state.constructorData);
  const [counter, setCounter] = useState({ bun: 0, ingredient: 0 });

  const dispatch = useDispatch();
  const openModal = () => {
    dispatch({ type: OPEN_INGREDIENT_MODAL });
  };
  const getViewItem = () => {
    dispatch({ type: GET_VIEW_ITEM, viewItem: ingredient });
  };

  useEffect(() => {
    if (bun.length !== 0 && bunId === _id) {
      setCounter({ ...counter, bun: 2 });
    } else {
      setCounter({ ...counter, bun: 0 });
    }
  }, [bunId]);

  useEffect(() => {
    const filtredList = [...ingredients].filter((item) => {
      return item.ingredient._id === _id;
    });
    setCounter({ ...counter, ingredient: filtredList.length });

    if (bun.length !== 0) {
      setBunId(bun[0]["ingredient"]._id);
    }
  }, [ingredients, bun]);

  const [{ isDrag }, drag] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const opacityNum = isDrag ? 0.3 : 1;

  return (
    <div
      opacity
      ref={drag}
      className={`${styles.ingredient_box} `}
      style={{ opacity: `${opacityNum}` }}
      onClick={() => {
        openModal();
        getViewItem();
      }}
    >
      <img src={image} alt="фото ингредиента" />
      {counter.bun !== 0 && type === "bun" ? (
        <Counter count={counter.bun} size="default" extraClass="m-1" />
      ) : counter.ingredient !== 0 && type !== "bun" ? (
        <Counter count={counter.ingredient} size="default" extraClass="m-1" />
      ) : (
        <></>
      )}
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
// BurgerIngredientsItem.propTypes = {
//   name: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   isCounter: PropTypes.bool.isRequired,
//   toggleModal: PropTypes.func.isRequired,
//   getDataIngredient: PropTypes.func.isRequired,
// };
