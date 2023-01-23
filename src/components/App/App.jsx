import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { getData } from "../../utils/funcs";
import { AppContext } from "../../utils/AppContext.js";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isOpenIngredientModal, setIsOpenIngredientModal] = useState(false);
  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);

  const toggleIngredientModal = () => {
    setIsOpenIngredientModal(!isOpenIngredientModal);
  };
  const toggleOrderModal = () => {
    setIsOpenOrderModal(!isOpenOrderModal);
  };

  useEffect(() => {
    getData()
      .then((data) => setData(data.data))
      .catch((e) => {
        setError(e);
      });
  }, []);

  if (error) {
    return <ErrorMessage />;
  }
  return (
    <AppContext.Provider
      value={{
        data,
        toggleOrderModal,
        isOpenOrderModal,
        toggleIngredientModal,
        isOpenIngredientModal,
        setError,
      }}
    >
      <div className={styles.App}>
        <AppHeader
          constructor={"Конструктор"}
          listItems={"Лента заказов"}
          profile={"Личный кабинет"}
        ></AppHeader>
        <div className={styles.app_grid_container}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
