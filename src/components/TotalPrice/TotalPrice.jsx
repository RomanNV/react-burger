import styles from "./TotalPrice.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_CONSTRUCTOR_MODAL } from "../../services/actions/constructorModal";
import { getOrderNum, NOT_BUN } from "../../services/actions/totalPrice";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { authState } from "../../utils/funcs";
import { getCookie } from "../../cookie/cookie";

export const TotalPrice = ({ listIdOrder, totalPrice }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(authState);
  const navigate = useNavigate();
  const location = useLocation();
  const isAccessToken = getCookie("accessToken");
  const openModal = () => {
    if (user) {
      dispatch({ type: OPEN_CONSTRUCTOR_MODAL });
    }
  };

  const getOrder = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
    } else dispatch(getOrderNum(listIdOrder));
  };

  return (
    <div className={styles.button_container}>
      <span className={styles.price_box}>
        <p className="text text_type_main-large">{totalPrice}</p>
        <CurrencyIcon className={styles.icon} type="primary" />
      </span>
      <Button
        onClick={() => {
          getOrder();
          openModal();
        }}
        htmlType="button"
        type="primary"
        size="large"
      >
        Оформить заказ
      </Button>
    </div>
  );
};

TotalPrice.propTypes = {
  listIdOrder: PropTypes.array,
  totalPrice: PropTypes.number,
};
