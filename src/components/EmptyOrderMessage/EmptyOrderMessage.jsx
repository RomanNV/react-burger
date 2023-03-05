import styles from "./EmptyOrderMessage.module.css";
import PropTypes from "prop-types";
export const EmptyOrderMessage = ({ error }) => {
  return (
    <div className={`${styles.box_message}  `}>
      <p className="text text_type_digits-default">{error}</p>
    </div>
  );
};

EmptyOrderMessage.propTypes = {
  error: PropTypes.string.isRequired,
};
