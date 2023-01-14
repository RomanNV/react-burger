import styles from "./ModalOverlay.module.css";
import { useEffect } from "react";

export const ModalOverlay = ({ closeModal }) => {
  const keyResponce = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("his");
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
