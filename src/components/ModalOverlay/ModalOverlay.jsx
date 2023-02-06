import styles from "./ModalOverlay.module.css";
import { useEffect } from "react";
import PropTypes from "prop-types";

export const ModalOverlay = ({ closeModal }) => {
  const keyResponce = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === "Escape") {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", keyResponce);

    return () => {
      document.removeEventListener("keydown", keyResponce);
    };
  }, []);

  return (
    <div className={styles.modal_overlay} onClick={() => closeModal()}></div>
  );
};

ModalOverlay.propTypes = {
  toggleModal: PropTypes.func,
};
