import { useEffect } from "react";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from "../../services/actions/burgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../../components/AppHeader/AppHeader";
import { authState, getIngredientsDataFromState } from "../../utils/funcs";
import { BurgerIngredients } from "../../components/BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

export const Home = () => {
  // const {  error, sAuthChecked, isAuthRequest, isResetPassword } =
  //   useSelector(getIngredientsDataFromState);
  const { user, error, isAuthChecked, isAuthRequest, isResetPassword } =
    useSelector(authState);
  console.log(
    `{user:${user}, isAuthChecked:${isAuthChecked}, isAuthRequest:${isAuthRequest}, isResetPassword:${isResetPassword}, error:${error}}`
  );

  // if (error) {
  //   return <ErrorMessage />;
  // }
  return (
    <div className={styles.AppHome}>
      <AppHeader title={"Личный кабинет"}></AppHeader>
      <div className={styles.apphome_grid_container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </div>
  );
};
