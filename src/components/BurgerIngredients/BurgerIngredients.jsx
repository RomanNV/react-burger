import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { data } from "../../utils/data.js";
import { BurgerGroup } from "../BurgerGroup/BurgerGroup";
import PropTypes from "prop-types";

export const BurgerIngredients = ({ dataIngredients }) => {
  const isCounter = true;
  const tabDataBun = data.filter((element) => {
    if (element.type === "bun") {
      return element;
    }
  });

  const tabDataMain = data.filter((element) => {
    if (element.type === "main") {
      return element;
    }
  });
  const tabDataSauce = data.filter((element) => {
    if (element.type === "sauce") {
      return element;
    }
  });

  return (
    <section className={styles.content_box}>
      <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
      <div className={styles.tab_box}>
        <Tab>Булки</Tab>
        <Tab>Соусы</Tab>
        <Tab>Начинки</Tab>
      </div>

      <ul className={`custom-scroll ${styles.ul_box}`}>
        <li>
          <BurgerGroup
            tabData={tabDataBun}
            title={"Булки"}
            isCounter={isCounter}
          ></BurgerGroup>
        </li>
        <li>
          <BurgerGroup
            tabData={tabDataSauce}
            title={"Соусы"}
            isCounter={isCounter}
          ></BurgerGroup>
        </li>
        <li>
          <BurgerGroup
            tabData={tabDataMain}
            title={"Начинки"}
            isCounter={isCounter}
          ></BurgerGroup>
        </li>
      </ul>
    </section>
  );
};
BurgerIngredients.propTypes = {
  dataIngredients: PropTypes.array,
};
