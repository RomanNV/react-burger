import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import bun from "../../images/bun-02.svg";
import sauce from "../../images/sauce-03.png";
import meate from "../../images/meat-02.png";
import sp from "../../images/sp 1.png";
import mineralRing from "../../images/mineral rings.png";
import styles from "./BurgerIngredients.module.css";
import { data } from "../../utils/data.js";

export const BurgerIngredients = () => {
  return (
    <section className={styles.content_box}>
      <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
      <div className={styles.tab_box}>
        <Tab>Булки</Tab>
        <Tab>Соусы</Tab>
        <Tab>Начинки</Tab>
      </div>
      <ul>
        <li></li>
      </ul>
    </section>
  );
};
