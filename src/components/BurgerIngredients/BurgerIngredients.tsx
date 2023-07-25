import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { BurgerGroup } from "../BurgerGroup/BurgerGroup";
import { useMemo, useRef, useState } from "react";
import { useSelector } from "../../hooks/redux-hooks";
import { getIngredientsDataFromState } from "../../services/reducers/stateFuncs";
import { IngredientCard } from "../../types/commonTypes";

export const BurgerIngredients: React.FC = () => {
  const { dataIngredients } = useSelector(getIngredientsDataFromState);
  const [position, setPosition] = useState<string>("one");

  const bunTab = useRef<HTMLLIElement>(null);
  const sauceTab = useRef<HTMLLIElement>(null);
  const mainTab = useRef<HTMLLIElement>(null);

  const tabScroll = (element: HTMLElement) => {
    element.scrollIntoView({ behavior: "smooth" });
  };

  const ulScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const ulTop = (e.target as HTMLUListElement).scrollTop;
    if (ulTop > (bunTab.current as HTMLLIElement).scrollHeight - 10) {
      setPosition("two");
    }
    if (
      ulTop >
      (sauceTab.current as HTMLLIElement).scrollHeight +
        (bunTab.current as HTMLLIElement).scrollHeight
    ) {
      setPosition("three");
    }
    if (ulTop === 0) {
      setPosition("one");
    }
  };

  const tabDataBun: IngredientCard[] = useMemo(
    () =>
      dataIngredients.filter((element: IngredientCard) => {
        if (element.type === "bun") {
          return element;
        }
      }),
    [dataIngredients]
  );

  const tabDataMain: IngredientCard[] = useMemo(
    () =>
      dataIngredients.filter((element: IngredientCard) => {
        if (element.type === "main") {
          return element;
        }
      }),
    [dataIngredients]
  );

  const tabDataSauce: IngredientCard[] = useMemo(
    () =>
      dataIngredients.filter((element: IngredientCard) => {
        if (element.type === "sauce") {
          return element;
        }
      }),
    [dataIngredients]
  );

  return (
    <>
      <section className={styles.content_box}>
        <h1 className={`text text_type_main-large`}>Соберите бургер</h1>
        <div className={styles.tab_box}>
          <Tab
            onClick={() => tabScroll(bunTab.current as HTMLLIElement)}
            active={position === "one"}
            value={"Булки"}
          >
            Булки
          </Tab>
          <Tab
            onClick={() => tabScroll(sauceTab.current as HTMLLIElement)}
            active={position === "two"}
            value={"Соусы"}
          >
            Соусы
          </Tab>
          <Tab
            onClick={() => tabScroll(mainTab.current as HTMLLIElement)}
            active={position === "three"}
            value={"Начинки"}
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
