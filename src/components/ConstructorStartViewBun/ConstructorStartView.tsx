import styles from "./ConstructorStartViewBun.module.css";

export const ConstructorStartViewBunTop: React.FC = () => {
  return (
    <div className={styles.bun_body_top}>
      <p className={`text text_type_main-default ${styles.p_position}`}>
        Добавьте булку (верх)
      </p>
    </div>
  );
};
export const ConstructorStartViewBunBottom: React.FC = () => {
  return (
    <div className={styles.bun_body_bottom}>
      <p className={`text text_type_main-default ${styles.p_position}`}>
        Добавьте булку (низ)
      </p>
    </div>
  );
};
export const ConstructorStartViewBunIngredient: React.FC = () => {
  return (
    <div className={styles.bun_body_ingredient}>
      <p className={`text text_type_main-default ${styles.p_position}`}>
        Добавьте начинку
      </p>
    </div>
  );
};
