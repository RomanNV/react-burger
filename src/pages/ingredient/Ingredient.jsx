import { useSelector } from "react-redux";
import AppHeader from "../../components/AppHeader/AppHeader";
import styles from "./Ingredient.module.css";
import { getIngredientsDataFromState } from "../../utils/funcs";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Ingredient = () => {
  const { dataIngredients } = useSelector(getIngredientsDataFromState);
  const location = useLocation();

  useEffect(() => {}, []);
  return (
    <>
      <AppHeader />
      {/* <div className={styles.modal_content}>
        <header className={styles.header_box}>
          <p className="text text_type_main-large">Детали ингредиента</p>
        </header>
        <div className={styles.ingredient_card}>
          <img src={image_large} alt="Фото ингредиента" />
          <p className="text text_type_main-medium pt-3">{name}</p>
          <div className={styles.info_box}>
            <div className={styles.info}>
              {" "}
              <p className="text text_type_main-default text_color_inactive">
                Калории,ккал
              </p>
              <p className="text text_type_digits-medium text_color_inactive">
                {calories}
              </p>
            </div>
            <div className={styles.info}>
              <p className="text text_type_main-default text_color_inactive">
                Белки, г
              </p>
              <p className="text text_type_digits-medium text_color_inactive">
                {proteins}
              </p>
            </div>
            <div className={styles.info}>
              <p className="text text_type_main-default text_color_inactive">
                Жиры, г
              </p>
              <p className="text text_type_digits-medium text_color_inactive">
                {fat}
              </p>
            </div>
            <div className={styles.info}>
              <p className="text text_type_main-default text_color_inactive">
                Углеводы, г
              </p>
              <p className="text text_type_digits-medium text_color_inactive">
                {carbohydrates}
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
