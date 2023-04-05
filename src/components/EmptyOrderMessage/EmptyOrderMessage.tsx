import { ErrorType } from "../../types/commonTypes";
import styles from "./EmptyOrderMessage.module.css";

export const EmptyOrderMessage: React.FC<ErrorType> = ({ error }) => {
  return (
    <div className={`${styles.box_message}  `}>
      <p className="text text_type_digits-default">{error}</p>
    </div>
  );
};
