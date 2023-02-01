import styles from "./OrderDetails.module.css";
import doneImage from "../../images/done.svg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";

export const OrderDetails = () => {
  const { orderData, isOrderDataRequest } = useSelector(
    (state) => state.constructorData
  );
  return (
    <>
      <div className={styles.modal_content}>
        <div className={styles.content_box}>
          <div className={styles.order_box}>
            {isOrderDataRequest ? (
              <Loader></Loader>
            ) : (
              <p className=" text text_type_digits-large">{orderData}</p>
            )}
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
// OrderDetails.propTypes = {
//   toggleModal: PropTypes.func,
//   orderNum: PropTypes.number,
// };
