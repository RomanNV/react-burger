import styles from "./ErrorMessage.module.css";
export const ErrorMessage = ({ error }) => {
  return (
    <div className={styles.error_message}>
      <p>Произошла ошибка, попробуйте зайти еще раз</p>

      <p>{error}</p>
    </div>
  );
};
