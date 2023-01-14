import styles from "./OrderDetails.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import doneImage from "../../images/done.svg";

export const OrderDetails = ({ orderNum, closeModal }) => {
  return (
    <>
      <div className={styles.modal_content}>
        <div onClick={() => closeModal()} className={styles.close_icon}>
          <CloseIcon type="primary" />
        </div>

        <div className={styles.content_box}>
          <div className={styles.order_box}>
            <p className=" text text_type_digits-large">{orderNum}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
          </div>

          <img src={doneImage} alt="заказ готов" />

          <div className={styles.info_box}>
            <p className="text text_type_main-default">
              Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
              Дождитесь готовности на орбитальной станции
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
