import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
const modalRoot = document.getElementById("modal");

export const Modal = ({ children }) => {
  return createPortal(
    <div className={styles.modal_position}>{children}</div>,
    modalRoot
  );
};
