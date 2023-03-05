import styles from "./ErrorMessage.module.css";
import PropTypes from "prop-types";

export const ErrorMessage = ({ error }) => {
  return (
    <div className={styles.error_message}>
      <p>Произошла ошибка, попробуйте еще раз</p>
      <p>{error?.message}</p>
    </div>
  );
};
ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
};
