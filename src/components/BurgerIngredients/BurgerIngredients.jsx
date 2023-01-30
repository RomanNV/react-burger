import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { BurgerGroup } from "../BurgerGroup/BurgerGroup";
import { useMemo, useRef } from "react";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_INGREDIENT_MODAL } from "../../services/actions/ingredientModal";

export const BurgerIngredients = () => {
  const { dataIngredients, viewItem } = useSelector(
    (state) => state.ingredientsData
  );
  const { isOpenIngredientModal } = useSelector(
    (state) => state.ingredientModal
  );
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_INGREDIENT_MODAL });
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
      dataIngredients.filter((element) => {
        if (element.type === "bun") {
          return element;
        }
      }),
    [dataIngredients]
  );

  const tabDataMain = useMemo(
    () =>
      dataIngredients.filter((element) => {
        if (element.type === "main") {
          return element;
        }
      }),
    [dataIngredients]
  );

  const tabDataSauce = useMemo(
    () =>
      dataIngredients.filter((element) => {
        if (element.type === "sauce") {
          return element;
        }
      }),
    [dataIngredients]
  );

  return (
    <>
      {
        <Modal closeModal={closeModal} isOpenModal={isOpenIngredientModal}>
          <IngredientDetails {...viewItem}></IngredientDetails>
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
              tabData={tabDataBun}
              title={"Булки"}
              isCounter={isCounter}
            ></BurgerGroup>
          </li>
          <li ref={sauceTab}>
            <BurgerGroup
              tabData={tabDataSauce}
              title={"Соусы"}
              isCounter={isCounter}
            ></BurgerGroup>
          </li>
          <li ref={mainTab}>
            <BurgerGroup
              tabData={tabDataMain}
              title={"Начинки"}
              isCounter={isCounter}
            ></BurgerGroup>
          </li>
        </ul>
      </section>
    </>
  );
};
