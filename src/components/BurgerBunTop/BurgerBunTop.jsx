import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";

export const BurgerBunTop = ({ name, price, image }) => {
  return (
    <>
      <ConstructorElement
        text={`${name} (верх)`}
        price={price}
        isLocked={true}
        type={"top"}
        thumbnail={image}
      ></ConstructorElement>
    </>
  );
};
// BurgerBunTop.propTypes = {
//   image: PropTypes.string,
//   name: PropTypes.string,
//   price: PropTypes.number,
//   isLocked: PropTypes.bool,
// };
