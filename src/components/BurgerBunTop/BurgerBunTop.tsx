import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";
import { BunFields } from "../../types/commonTypes";

export const BurgerBunTop: React.FC<BunFields> = ({
  name,
  price,
  image,
}: BunFields): JSX.Element => {
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
