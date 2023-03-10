import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
export const BurgerBunBottom = ({ name, price, image }) => {
  return (
    <>
      <ConstructorElement
        text={`${name} (низ)`}
        price={price}
        isLocked={true}
        type={"bottom"}
        thumbnail={image}
      ></ConstructorElement>
    </>
  );
};
BurgerBunBottom.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  isLocked: PropTypes.bool,
};
