import styles from "./ConstructorStartViewBun.module.css";

export const ConstructorStartViewBunTop = () => {
  return (
    <div className={styles.bun_body_top}>
      <p className={`text text_type_main-default ${styles.p_position}`}>
        Добавьте булку
      </p>
    </div>
  );
};
export const ConstructorStartViewBunBottom = () => {
  return (
    <div className={styles.bun_body_bottom}>
      <p className={`text text_type_main-default ${styles.p_position}`}>
        Добавьте булку
      </p>
    </div>
  );
};
export const ConstructorStartViewBunIngredient = () => {
  return (
    <div className={styles.bun_body_ingredient}>
      <p className={`text text_type_main-default ${styles.p_position}`}>
        Добавьте начинку
      </p>
    </div>
  );
};
