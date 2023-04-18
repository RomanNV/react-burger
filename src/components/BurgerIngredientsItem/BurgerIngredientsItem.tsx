import styles from "./BurgerIngredientsItem.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_VIEW_ITEM,
  getViewItem,
} from "../../services/actions/burgerIngredients";
import { useDrag } from "react-dnd";
import { useEffect, useState } from "react";
import { getConstructorData } from "../../services/reducers/stateFuncs";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BurgerIngredientsItemType,
  CounterStateType,
} from "../../types/commonTypes";

export const BurgerIngredientsItem: React.FC<BurgerIngredientsItemType> = ({
  ingredient,
  setBunId,
  bunId,
}) => {
  const { name, price, image, _id, type } = ingredient;
  const { ingredients, bun } = useSelector(getConstructorData);
  const [counter, setCounter] = useState<CounterStateType>({
    bun: 0,
    ingredient: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const getViewIngredient = () => {
    dispatch(getViewItem(ingredient));
  };

  //отслеживаем id булки и меняем состояние
  useEffect(() => {
    if (bun.length !== 0 && bunId === _id) {
      setCounter({ ...counter, bun: 2 });
    } else {
      setCounter({ ...counter, bun: 0 });
    }
  }, [bunId]);
  //определяем количество ингредиентов, а также запоминаем id булки
  useEffect(() => {
    const filtredList = [...ingredients].filter((item) => {
      return item.ingredient._id === _id;
    });
    setCounter({ ...counter, ingredient: filtredList.length });

    if (bun.length !== 0) {
      setBunId(bun[0]["ingredient"]._id);
    } else {
      setBunId("");
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
      ref={drag}
      className={`${styles.ingredient_box} `}
      style={{ opacity: `${opacityNum}` }}
      onClick={() => {
        navigate(`/ingredients/${_id}`, {
          state: { background: location.pathname },
        });
        getViewIngredient();
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
};
