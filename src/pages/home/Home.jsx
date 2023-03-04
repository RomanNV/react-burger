import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../../components/AppHeader/AppHeader";
import { authState } from "../../utils/funcs";
import { BurgerIngredients } from "../../components/BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

export const Home = () => {
  const { error } = useSelector(authState);
  if (error) {
    return <ErrorMessage error={error.message} />;
  }
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
