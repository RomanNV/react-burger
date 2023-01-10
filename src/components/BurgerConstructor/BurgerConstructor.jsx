import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";

export const BurgerConstructor = ({ dataProps }) => {
  const data = dataProps;
  let tempBun = [];

  data.findIndex((element, index) => {
    if (element.type === "bun") {
      tempBun.push(index);
    }
  });
  const getTopBun = ({ _id, image, name, price }) => {
    return (
      <ul className={styles.ul_box_fixed}>
        <li key={_id}>
          <div style={{ width: "24px", height: "24px" }}></div>
          <ConstructorElement
            text={name}
            price={price}
            isLocked={true}
            type={"top"}
            thumbnail={image}
          ></ConstructorElement>
        </li>
      </ul>
    );
  };

  const getBottomBun = ({ _id, image, name, price }) => {
    return (
      <ul className={styles.ul_box_fixed}>
        <li key={_id}>
          <div style={{ width: "24px", height: "24px" }}></div>
          <ConstructorElement
            text={name}
            price={price}
            isLocked={true}
            type={"bottom"}
            thumbnail={image}
          ></ConstructorElement>
        </li>
      </ul>
    );
  };

  return (
    <section className={styles.content_box}>
      <div className={styles.burger_box}>
        {getTopBun(data[tempBun.shift()])}

        <ul className={`custom-scroll ${styles.ul_box_scroll}`}>
          {data.map(({ _id, image, name, price, type }) => {
            if (type === "bun") {
              return;
            } else {
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
            }
          })}
        </ul>
        {getBottomBun(data[tempBun.shift()])}
      </div>

      <div className={styles.button_container}>
        <span className={styles.price_box}>
          <p className="text text_type_main-large">610</p>
          <CurrencyIcon className={styles.icon} type="primary" />
        </span>
        <Button htmlType="button" type="primary" size="large">
          Нажми на меня
        </Button>
      </div>
    </section>
  );
};
