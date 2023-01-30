import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { AppContext } from "../../utils/AppContext.js";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from "../../services/actions/burgerIngredients";
function App() {
  const { error } = useSelector((state) => state.ingredientsData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

  if (error) {
    return <ErrorMessage />;
  }
  return (
    <AppContext.Provider
      value={
        {
          // data,
          // toggleOrderModal,
          // isOpenOrderModal,
          // toggleIngredientModal,
          // isOpenIngredientModal,
        }
      }
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
