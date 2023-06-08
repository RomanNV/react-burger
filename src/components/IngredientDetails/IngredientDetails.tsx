import { IngredientCardWithToggleModal } from "../../types/commonTypes";
import styles from "./IngredientDetails.module.css";
export const IngredientDetails: React.FC<IngredientCardWithToggleModal> = ({
  image_large,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
  isNotModal,
}): JSX.Element => {
  return (
    <div className={isNotModal ? styles.page_content : styles.modal_content}>
      <header className={isNotModal ? styles.header_page : styles.header_box}>
        <p className="text text_type_main-large">Детали ингредиента</p>
      </header>
      <div className={styles.ingredient_card}>
        <img
          src={image_large}
          className={styles.img_style}
          alt="Фото ингредиента"
        />
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
    </div>
  );
};
