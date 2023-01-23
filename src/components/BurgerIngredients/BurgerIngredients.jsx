import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { BurgerGroup } from "../BurgerGroup/BurgerGroup";
import { useMemo, useState, useRef } from "react";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { AppContext } from "../../utils/AppContext";
import React, { useContext } from "react";

export const BurgerIngredients = () => {
  const { data, toggleIngredientModal, isOpenIngredientModal } =
    useContext(AppContext);

  const [ingredientData, setIngredientData] = useState();

  const getDataIngredient = (ingredient) => {
    setIngredientData(ingredient);
  };

  const bunTab = useRef(null);
  const sauceTab = useRef(null);
  const mainTab = useRef(null);

  const onScroll = (element) => {
    element.scrollIntoView({ behavior: "smooth" });
  };

  const isCounter = true;

  const tabDataBun = useMemo(
    () =>
      data.filter((element) => {
        if (element.type === "bun") {
          return element;
        }
      }),
    [data]
  );

  const tabDataMain = useMemo(
    () =>
      data.filter((element) => {
        if (element.type === "main") {
          return element;
        }
      }),
    [data]
  );

  const tabDataSauce = useMemo(
    () =>
      data.filter((element) => {
        if (element.type === "sauce") {
          return element;
        }
      }),
    [data]
  );

  return (
    <>
      {
        <Modal
          toggleModal={toggleIngredientModal}
          isOpenModal={isOpenIngredientModal}
        >
          <IngredientDetails
            toggleModal={toggleIngredientModal}
            {...ingredientData}
          ></IngredientDetails>
        </Modal>
      }
      <section className={styles.content_box}>
        <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
        <div className={styles.tab_box}>
          <Tab onClick={() => onScroll(bunTab.current)}>Булки</Tab>
          <Tab onClick={() => onScroll(sauceTab.current)}>Соусы</Tab>
          <Tab onClick={() => onScroll(mainTab.current)}>Начинки</Tab>
        </div>

        <ul className={`custom-scroll ${styles.ul_box}`}>
          <li ref={bunTab}>
            <BurgerGroup
              getDataIngredient={getDataIngredient}
              tabData={tabDataBun}
              title={"Булки"}
              isCounter={isCounter}
              toggleModal={toggleIngredientModal}
            ></BurgerGroup>
          </li>
          <li ref={sauceTab}>
            <BurgerGroup
              getDataIngredient={getDataIngredient}
              tabData={tabDataSauce}
              title={"Соусы"}
              isCounter={isCounter}
              toggleModal={toggleIngredientModal}
            ></BurgerGroup>
          </li>
          <li ref={mainTab}>
            <BurgerGroup
              getDataIngredient={getDataIngredient}
              tabData={tabDataMain}
              title={"Начинки"}
              isCounter={isCounter}
              toggleModal={toggleIngredientModal}
            ></BurgerGroup>
          </li>
        </ul>
      </section>
    </>
  );
};
