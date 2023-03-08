import styles from "./ErrorMessage.module.css";
import PropTypes from "prop-types";

export const ErrorMessage = ({ error }) => {
  console.log(error);
  return (
    <div className={styles.error_message}>
      <p>Произошла ошибка, попробуйте еще раз</p>
      <p>{error?.message || error}</p>
    </div>
  );
};
ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired,
};
