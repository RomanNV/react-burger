import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import { BurgerConstructor } from "./components/BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "./components/BurgerIngredients/BurgerIngredients";
import { getData } from "./utils/funcs";
import { ConstructorContext } from "./utils/ConstructorContext.js";
import { ErrorMessage } from "./components/ErrorMessage/ErrorMessage";

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
    getData(setData, setError);
  }, []);

  if (error) {
    return <ErrorMessage></ErrorMessage>;
  }
  return (
    <div className="App">
      <AppHeader
        constructor={"Конструктор"}
        listItems={"Лента заказов"}
        profile={"Личный кабинет"}
      ></AppHeader>
      <div className="app_grid_container">
        <BurgerIngredients
          dataProps={data}
          toggleModal={toggleIngredientModal}
          isOpenModal={isOpenIngredientModal}
        ></BurgerIngredients>
        <ConstructorContext.Provider
          value={{ setError, data, toggleOrderModal, isOpenOrderModal }}
        >
          <BurgerConstructor></BurgerConstructor>
        </ConstructorContext.Provider>
      </div>
    </div>
  );
}

export default App;
