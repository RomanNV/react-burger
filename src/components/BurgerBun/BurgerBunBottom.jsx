import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerBunBottom.module.css";
export const BurgerBunBottom = ({ name, price, isLocked, image }) => {
  return (
    <>
      <ConstructorElement
        text={name}
        price={price}
        isLocked={isLocked}
        type={"bottom"}
        thumbnail={image}
      ></ConstructorElement>
    </>
  );
};
