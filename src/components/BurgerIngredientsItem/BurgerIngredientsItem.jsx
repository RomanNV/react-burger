import styles from "./BurgerIngredientsItem.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_INGREDIENT_MODAL } from "../../services/actions/ingredientModal";
import { GET_VIEW_ITEM } from "../../services/actions/burgerIngredients";
import { useDrag } from "react-dnd";

export function BurgerIngredientsItem(props) {
  console.log(props.idItem);
  const { name, price, image, isCounter } = props.ingredient;
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch({ type: OPEN_INGREDIENT_MODAL });
  };
  const getViewItem = () => {
    dispatch({ type: GET_VIEW_ITEM, viewItem: props.ingredient });
  };

  const [{ isDrag }, drag] = useDrag({
    type: "ingredient",
    item: props.idItem,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    !isDrag && (
      <div
        ref={drag}
        className={styles.ingredient_box}
        onClick={() => {
          openModal();
          getViewItem();
        }}
      >
        <img src={image} alt="фото ингредиента" />
        {!isCounter && <Counter count={1} size="default" extraClass="m-1" />}
        <div className={`p-1 ${styles.price_box}`}>
          <CurrencyIcon type="primary" />
          <span className="text text_type_digits-default">{price}</span>
        </div>
        <p className={`text text_type_main-default ${styles.ingredient_name}`}>
          {name}
        </p>
      </div>
    )
  );
}
// BurgerIngredientsItem.propTypes = {
//   name: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   isCounter: PropTypes.bool.isRequired,
//   toggleModal: PropTypes.func.isRequired,
//   getDataIngredient: PropTypes.func.isRequired,
// };
