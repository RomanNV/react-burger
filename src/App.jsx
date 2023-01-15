import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import { BurgerConstructor } from "./components/BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "./components/BurgerIngredients/BurgerIngredients";

const DATA_URL = "https://norma.nomoreparties.space/api/ingredients ";

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
    async function getData() {
      try {
        const responce = await fetch(DATA_URL);
        if (!responce.ok) {
          throw new Error();
        }
        const data = await responce.json();
        setData(data.data);
      } catch (err) {
        setError(err);
      }
    }
    getData();
  }, []);

  if (error) {
    return (
      <div className="error_message">
        <p>Произошла ошибка, попробуйте зайти еще раз</p>
      </div>
    );
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
        <BurgerConstructor
          toggleModal={toggleOrderModal}
          dataProps={data}
          isOpenModal={isOpenOrderModal}
        ></BurgerConstructor>
      </div>
    </div>
  );
}

export default App;
