import styles from "./EmptyOrderMessage.module.css";

export const EmptyOrderMessage = () => {
  return (
    <div className={`${styles.box_message}  `}>
      <p className="text text_type_digits-default">
        В бургере не может не быть булок
      </p>
    </div>
  );
};
