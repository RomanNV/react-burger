import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";

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
BurgerBunTop.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  isLocked: PropTypes.bool,
};
