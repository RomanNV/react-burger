import styles from "./IngredientDetails.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const IngredientDetails = ({
  image_large,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
  close,
}) => {
  return (
    <div className={styles.modal_content}>
      <header className={styles.header_box}>
        <p className="text text_type_main-large">Детали ингредиента</p>
        <CloseIcon type="primary" onClick={() => close()} />
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
    </div>
  );
};
