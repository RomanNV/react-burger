import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import bun from "../../images/bun-02.svg";
import sauce from "../../images/sauce-03.png";
import meate from "../../images/meat-02.png";
import sp from "../../images/sp 1.png";
import mineralRing from "../../images/mineral rings.png";
import styles from "./BurgerConstructor.module.css";

// import { data } from "../../utils/data.js";

export const BurgerConstructor = () => {
  const data = [
    {
      type: "top",
      isLocked: true,
      text: "Краторная булка N-200i (верх)",
      price: 20,
      thumbnail: bun,
    },
    {
      text: "Соус традиционный галактический",
      price: 30,
      thumbnail: sauce,
    },
    {
      text: "Мясо бессмертных моллюсков Protostomia",
      price: 300,
      thumbnail: meate,
    },
    {
      text: "Мясо бессмертных моллюсков Protostomia",
      price: 300,
      thumbnail: meate,
    },
    {
      text: "Мясо бессмертных моллюсков Protostomia",
      price: 300,
      thumbnail: meate,
    },
    {
      text: "Мясо бессмертных моллюсков Protostomia",
      price: 300,
      thumbnail: meate,
    },
    {
      text: "Мясо бессмертных моллюсков Protostomia",
      price: 300,
      thumbnail: meate,
    },
    {
      text: "Плоды Фалленианского дерева",
      price: 80,
      thumbnail: sp,
    },
    {
      text: "Хрустящие минеральные кольца",
      price: 80,
      thumbnail: mineralRing,
    },
    {
      text: "Хрустящие минеральные кольца",
      price: 80,
      thumbnail: mineralRing,
    },
    {
      type: "bottom",
      isLocked: true,
      text: "Краторная булка N-200i (низ)",
      price: 20,
      thumbnail: bun,
    },
  ];
  return (
    <section className={styles.content_box}>
      <div className={styles.burger_box}>
        {data.map((element, index) => {
          if (element.type === "top") {
            return (
              <ul className={styles.ul_box_fixed}>
                <li key={index}>
                  <div style={{ width: "24px", height: "24px" }}></div>
                  <ConstructorElement {...element}></ConstructorElement>
                </li>
              </ul>
            );
          }
        })}

        <ul className={`custom-scroll ${styles.ul_box_scroll}`}>
          {data.map((element, index) => {
            if (element.type === "bottom" || element.type === "top") {
              return;
            } else {
              return (
                <li key={index}>
                  <DragIcon type="primary" />
                  <ConstructorElement {...element}></ConstructorElement>
                </li>
              );
            }
          })}
        </ul>
        <div>
          {data.map((element, index) => {
            if (element.type === "bottom") {
              return (
                <ul className={styles.ul_box_fixed}>
                  <li key={index}>
                    <div style={{ width: "24px", height: "24px" }}></div>
                    <ConstructorElement {...element}></ConstructorElement>
                  </li>
                </ul>
              );
            }
          })}
        </div>
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
