import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { BunFields } from "../../types/commonTypes";
export const BurgerBunBottom: React.FC<BunFields> = ({
  name,
  price,
  image,
}: BunFields): JSX.Element => {
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
