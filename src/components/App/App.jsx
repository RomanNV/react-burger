import { useEffect } from "react";
import { getIngredientsFromState } from "../../utils/funcs";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from "../../services/actions/burgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function App() {
  const { error } = useSelector(getIngredientsFromState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

  if (error) {
    return <ErrorMessage />;
  }
  return (
    <div className={styles.App}>
      <AppHeader
        constructor={"Конструктор"}
        listItems={"Лента заказов"}
        profile={"Личный кабинет"}
      ></AppHeader>
      <div className={styles.app_grid_container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </div>
  );
}

export default App;
