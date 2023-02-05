import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import update from "immutability-helper";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  REORDER_INGREDIENT_LIST,
} from "../../services/actions/burgerConstructor";
import PropTypes from "prop-types";
import styles from "./ConstructorItem.module.css";

export const ConstructorItem = ({ item, index }) => {
  const { ingredients } = useSelector((state) => state.constructorData);
  const dispatch = useDispatch();
  const {
    itemId,
    ingredient: { image, name, price },
  } = item;

  const ref = useRef(null);

  const reorderItem = (dragIndex, hoverIndex) => {
    const splicedList = update([...ingredients], {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, [...ingredients][dragIndex]],
      ],
    });
    dispatch({
      type: REORDER_INGREDIENT_LIST,
      splisedList: splicedList,
    });
  };

  const [, drop] = useDrop({
    accept: "constructorElement",

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      reorderItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructorElement",
    item: { index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const deleteConstructorItem = (id) => {
    const filteredIngredients = ingredients.filter(
      (item) => item.itemId !== id
    );
    dispatch({
      type: DELETE_CONSTRUCTOR_INGREDIENT,
      ingredients: filteredIngredients,
    });
  };

  drag(drop(ref));
  const opacity = isDragging ? 0.5 : 1;

  return (
    <li className={styles.li} ref={ref} style={{ opacity: `${opacity}` }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => {
          deleteConstructorItem(itemId);
        }}
      ></ConstructorElement>
    </li>
  );
};

ConstructorItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
