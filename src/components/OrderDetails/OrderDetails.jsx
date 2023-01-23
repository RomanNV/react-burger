import styles from "./OrderDetails.module.css";
import doneImage from "../../images/done.svg";
import PropTypes from "prop-types";

export const OrderDetails = ({ orderNum }) => {
  return (
    <>
      <div className={styles.modal_content}>
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
OrderDetails.propTypes = {
  toggleModal: PropTypes.func,
  orderNum: PropTypes.number,
};
