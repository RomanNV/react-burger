import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modal");

export const Modal = ({ children, isOpenModal, toggleModal }) => {
  if (isOpenModal) {
    return createPortal(
      <>
        <div className={styles.modal_position}>
          <div className={styles.close_icon}>
            <CloseIcon type="primary" onClick={() => toggleModal()} />
          </div>
          {children}
        </div>
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
