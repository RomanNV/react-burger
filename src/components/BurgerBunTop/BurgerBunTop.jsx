import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerBunTop.module.css";
export const BurgerBunTop = ({ name, price, isLocked, image }) => {
  return (
    <>
      <ConstructorElement
        text={name}
        price={price}
        isLocked={isLocked}
        type={"top"}
        thumbnail={image}
      ></ConstructorElement>
    </>
  );
};
