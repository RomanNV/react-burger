import styles from "./OrderDetails.module.css";
import doneImage from "../../images/done.svg";
import { useSelector } from "react-redux";
import { Loader } from "../Loader/Loader";
import { EmptyOrderMessage } from "../EmptyOrderMessage/EmptyOrderMessage";
import { totalPriceState } from "../../utils/funcs";

export const OrderDetails: React.FC = () => {
  const { orderData, isOrderDataRequest, isEmptyOrder, error } =
    useSelector(totalPriceState);
  return (
    <>
      <div className={styles.modal_content}>
        <div className={styles.content_box}>
          {isEmptyOrder ? (
            <EmptyOrderMessage error={error} />
          ) : (
            <>
              <div className={styles.order_box}>
                {isOrderDataRequest ? (
                  <Loader></Loader>
                ) : (
                  <p className=" text text_type_digits-large">{orderData}</p>
                )}
                <p className="text text_type_main-medium">
                  идентификатор заказа
                </p>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};
