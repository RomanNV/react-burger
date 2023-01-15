import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

export const Modal = ({ children, isOpenModal, toggleModal }) => {
  if (isOpenModal) {
    return createPortal(
      <>
        <div className={styles.modal_position}>{children}</div>
        <ModalOverlay toggleModal={toggleModal}></ModalOverlay>
      </>,
      modalRoot
    );
  }
};
Modal.propTypes = {
  children: PropTypes.element,
  isOpenModal: PropTypes.bool,
  toggleModal: PropTypes.func,
};
