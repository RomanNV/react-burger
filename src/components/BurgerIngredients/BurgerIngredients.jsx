import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { BurgerGroup } from "../BurgerGroup/BurgerGroup";
import PropTypes from "prop-types";
import { useMemo, useState, useRef } from "react";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { propTypeData } from "../../utils/propTypeData.js";

export const BurgerIngredients = ({ dataProps, toggleModal, isOpenModal }) => {
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
    <>
      {
        <Modal toggleModal={toggleModal} isOpenModal={isOpenModal}>
          <IngredientDetails
            toggleModal={toggleModal}
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
              toggleModal={toggleModal}
            ></BurgerGroup>
          </li>
          <li ref={sauceTab}>
            <BurgerGroup
              getDataIngredient={getDataIngredient}
              tabData={tabDataSauce}
              title={"Соусы"}
              isCounter={isCounter}
              toggleModal={toggleModal}
            ></BurgerGroup>
          </li>
          <li ref={mainTab}>
            <BurgerGroup
              getDataIngredient={getDataIngredient}
              tabData={tabDataMain}
              title={"Начинки"}
              isCounter={isCounter}
              toggleModal={toggleModal}
            ></BurgerGroup>
          </li>
        </ul>
      </section>
    </>
  );
};
BurgerIngredients.propTypes = {
  dataProps: PropTypes.arrayOf(PropTypes.shape(propTypeData)).isRequired,
  toggleModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
};
