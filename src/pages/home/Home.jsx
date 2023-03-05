import styles from "./Home.module.css";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { authState } from "../../utils/funcs";
import { BurgerIngredients } from "../../components/BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { LayoutWithHeader } from "../../components/LayoutWithHeader/LayoutWithHeader";

export const Home = () => {
  const { error } = useSelector(authState);
  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <LayoutWithHeader>
      <div className={styles.AppHome}>
        <div className={styles.apphome_grid_container}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </div>
    </LayoutWithHeader>
  );
};
