import styles from "./ErrorMessage.module.css";
export const ErrorMessage = () => {
  return (
    <div className={styles.error_message}>
      <p>Произошла ошибка, попробуйте зайти еще раз</p>
    </div>
  );
};
