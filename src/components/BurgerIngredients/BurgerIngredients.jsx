import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { BurgerGroup } from "../BurgerGroup/BurgerGroup";
import { useMemo, useRef, useState } from "react";
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

  const [position, setPosition] = useState("one");

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_INGREDIENT_MODAL });
  };

  const bunTab = useRef(null);
  const sauceTab = useRef(null);
  const mainTab = useRef(null);

  const tabScroll = (element) => {
    element.scrollIntoView({ behavior: "smooth" });
  };

  // можно ли было активировать Tab через IntersectionObserver, однако я не смог разобраться как сделать
  // сделать это в случае когда у нас видно сразу 2 таба в самом начале? или здесь он не смог бы использоваться?

  const ulScroll = (e) => {
    const ulTop = e.target.scrollTop;
    if (ulTop > bunTab.current.scrollHeight) {
      setPosition("two");
    }
    if (ulTop > sauceTab.current.scrollHeight + bunTab.current.scrollHeight) {
      setPosition("three");
    }
    if (ulTop === 0) {
      setPosition("one");
    }
  };

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
          <Tab
            onClick={() => tabScroll(bunTab.current)}
            active={position === "one"}
          >
            Булки
          </Tab>
          <Tab
            onClick={() => tabScroll(sauceTab.current)}
            active={position === "two"}
          >
            Соусы
          </Tab>
          <Tab
            onClick={() => tabScroll(mainTab.current)}
            active={position === "three"}
          >
            Начинки
          </Tab>
        </div>

        <ul
          className={`custom-scroll ${styles.ul_box}`}
          onScroll={(e) => ulScroll(e)}
        >
          <li ref={bunTab}>
            <BurgerGroup tabData={tabDataBun} title={"Булки"}></BurgerGroup>
          </li>
          <li ref={sauceTab}>
            <BurgerGroup tabData={tabDataSauce} title={"Соусы"}></BurgerGroup>
          </li>
          <li ref={mainTab}>
            <BurgerGroup tabData={tabDataMain} title={"Начинки"}></BurgerGroup>
          </li>
        </ul>
      </section>
    </>
  );
};
