import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { BurgerGroup } from "../BurgerGroup/BurgerGroup";
import PropTypes from "prop-types";
import { useMemo } from "react";

export const BurgerIngredients = ({
  dataProps,
  openModal,
  getDataIngredient,
}) => {
  const isCounter = true;
  const tabDataBun = useMemo(
    () =>
      dataProps.filter((element) => {
        if (element.type === "bun") {
          return element;
        }
      }),
    [dataProps]
  );

  const tabDataMain = useMemo(
    () =>
      dataProps.filter((element) => {
        if (element.type === "main") {
          return element;
        }
      }),
    [dataProps]
  );

  const tabDataSauce = useMemo(
    () =>
      dataProps.filter((element) => {
        if (element.type === "sauce") {
          return element;
        }
      }),
    [dataProps]
  );

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
            getDataIngredient={getDataIngredient}
            tabData={tabDataBun}
            title={"Булки"}
            isCounter={isCounter}
            open={openModal}
          ></BurgerGroup>
        </li>
        <li>
          <BurgerGroup
            getDataIngredient={getDataIngredient}
            tabData={tabDataSauce}
            title={"Соусы"}
            isCounter={isCounter}
            open={openModal}
          ></BurgerGroup>
        </li>
        <li>
          <BurgerGroup
            getDataIngredient={getDataIngredient}
            tabData={tabDataMain}
            title={"Начинки"}
            isCounter={isCounter}
            open={openModal}
          ></BurgerGroup>
        </li>
      </ul>
    </section>
  );
};
BurgerIngredients.propTypes = {
  dataIngredients: PropTypes.array,
};
