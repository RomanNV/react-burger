import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import { BurgerBunBottom } from "../BurgerBunBottom/BurgerBunBottom";
import { BurgerBunTop } from "../BurgerBunTop/BurgerBunTop";

export const BurgerConstructor = ({ dataProps, openModal }) => {
  const data = dataProps;
  let tempBun = [];

  data.forEach((element, index) => {
    if (element.type === "bun") {
      tempBun.push(index);
    }
  });

  return (
    <section className={styles.content_box}>
      <div className={styles.burger_box}>
        <div className={styles.div_box_fixed}>
          <BurgerBunTop
            isLocked={"true"}
            {...data[tempBun.shift()]}
          ></BurgerBunTop>
        </div>

        <ul className={`custom-scroll ${styles.ul_box_scroll}`}>
          {data.map(({ _id, image, name, price, type }) => {
            if (type === "bun") {
              return;
            }
            return (
              <li key={_id}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={name}
                  price={price}
                  thumbnail={image}
                ></ConstructorElement>
              </li>
            );
          })}
        </ul>
        <div className={styles.div_box_fixed}>
          <BurgerBunBottom
            isLocked={"true"}
            {...data[tempBun.shift()]}
          ></BurgerBunBottom>
        </div>
      </div>

      <div className={styles.button_container}>
        <span className={styles.price_box}>
          <p className="text text_type_main-large">610</p>
          <CurrencyIcon className={styles.icon} type="primary" />
        </span>
        <Button
          onClick={openModal}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
