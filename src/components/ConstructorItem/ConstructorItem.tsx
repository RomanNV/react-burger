import type { XYCoord } from "dnd-core";
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
import styles from "./ConstructorItem.module.css";
import { getConstructorData } from "../../services/reducers/stateFuncs";
import {
  ConstructorItemType,
  DragItem,
  IngredientCardWithId,
} from "../../types/commonTypes";

export const ConstructorItem: React.FC<ConstructorItemType> = ({
  item,
  index,
}) => {
  const { ingredients } = useSelector(getConstructorData);
  const dispatch = useDispatch();
  const {
    itemId,
    ingredient: { image, name, price },
  } = item;

  const ref = useRef<HTMLDivElement>(null);

  const reorderItem = (dragIndex: number, hoverIndex: number): void => {
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

  const [, drop] = useDrop<DragItem, void>({
    accept: "constructorElement",

    hover(item: DragItem, monitor) {
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
    collect: (monitor: any) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const deleteConstructorItem = (id: number): void => {
    const filteredIngredients = ingredients.filter(
      (item: IngredientCardWithId) => item.itemId !== id
    );
    dispatch({
      type: DELETE_CONSTRUCTOR_INGREDIENT,
      ingredients: filteredIngredients,
    });
  };

  drag(drop(ref));

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div ref={ref}>
      <li className={styles.li} style={{ opacity: `${opacity}` }}>
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
    </div>
  );
};
