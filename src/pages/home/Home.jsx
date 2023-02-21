import { useEffect } from "react";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from "../../services/actions/burgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../../components/AppHeader/AppHeader";
import { getIngredientsDataFromState } from "../../utils/funcs";
import { BurgerIngredients } from "../../components/BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { getCookie, setCookie } from "../../cookie/cookie";

export const Home = () => {
  const { dataIngredients } = useSelector(getIngredientsDataFromState);
  const { error } = useSelector(getIngredientsDataFromState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

  if (error) {
    return <ErrorMessage />;
  }
  return (
    <div className={styles.AppHome}>
      <AppHeader></AppHeader>
      <div className={styles.apphome_grid_container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </div>
  );
};
