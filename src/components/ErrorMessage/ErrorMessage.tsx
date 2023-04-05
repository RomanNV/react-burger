import { ErrorType } from "../../types/commonTypes";
import styles from "./ErrorMessage.module.css";

export const ErrorMessage: React.FC<ErrorType> = ({ error }) => {
  return (
    <div className={styles.error_message}>
      <p>Произошла ошибка, попробуйте еще раз</p>
      <p>{error}</p>
    </div>
  );
};
