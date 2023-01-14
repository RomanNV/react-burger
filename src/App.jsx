import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import { BurgerConstructor } from "./components/BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "./components/BurgerIngredients/BurgerIngredients";
import { data } from "./utils/data";

function App() {
  return (
    <div className="App">
      <AppHeader
        constructor={"Конструктор"}
        listItems={"Лента заказов"}
        profile={"Личный кабинет"}
      ></AppHeader>
      <div className="app_grid_container">
        <BurgerIngredients></BurgerIngredients>
        <BurgerConstructor dataProps={data}></BurgerConstructor>
      </div>
    </div>
  );
}

export default App;
