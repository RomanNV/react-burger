import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import { BurgerConstructor } from "./components/BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "./components/BurgerIngredients/BurgerIngredients";
import { Modal } from "./components/Modal/Modal";
import { OrderDetails } from "./components/OrderDetails/OrderDetails";
import { ModalOverlay } from "./components/ModalOverlay/ModalOverlay";
import { IngredientDetails } from "./components/IngredientDetails/IngredientDetails";

const DATA_URL = "https://norma.nomoreparties.space/api/ingredients ";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isOpenIngredientModal, setIsOpenIngredientModal] = useState(false);
  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);
  const [ingredientData, setIngredientData] = useState();

  const closeIngredientModal = () => {
    setIsOpenIngredientModal(!isOpenIngredientModal);
  };
  const closeOrderModal = () => {
    setIsOpenOrderModal(!isOpenOrderModal);
  };
  const openOrderModal = () => {
    setIsOpenOrderModal(!isOpenOrderModal);
  };
  const openIngredientModal = (ingredient) => {
    setIsOpenIngredientModal(!isOpenIngredientModal);
  };
  const getDataIngredient = (ingredient) => {
    setIngredientData(ingredient);
  };

  useEffect(() => {
    async function getData() {
      try {
        const responce = await fetch(DATA_URL);
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
  if (isOpenOrderModal) {
    return (
      <>
        <Modal>
          <OrderDetails
            orderNum="034536"
            closeModal={closeOrderModal}
          ></OrderDetails>
        </Modal>
        <ModalOverlay closeModal={closeOrderModal}></ModalOverlay>
      </>
    );
  }
  if (isOpenIngredientModal) {
    return (
      <>
        <Modal>
          <IngredientDetails
            {...ingredientData}
            close={closeIngredientModal}
          ></IngredientDetails>
        </Modal>
        <ModalOverlay closeModal={closeIngredientModal}></ModalOverlay>
      </>
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
          getDataIngredient={getDataIngredient}
          openModal={openIngredientModal}
        ></BurgerIngredients>
        <BurgerConstructor
          openModal={openOrderModal}
          dataProps={data}
        ></BurgerConstructor>
      </div>
    </div>
  );
}

export default App;
