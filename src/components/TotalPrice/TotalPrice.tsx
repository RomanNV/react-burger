import styles from "./TotalPrice.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../hooks/redux-hooks";
import { openConstructorModalAction } from "../../services/actions/constructorModal";
import { getOrderNum } from "../../services/actions/totalPrice";
import { useLocation, useNavigate } from "react-router-dom";
import { authState } from "../../services/reducers/stateFuncs";
import { TotalPriceType } from "../../types/commonTypes";
import { AppDispatch } from "../../types";

export const TotalPrice: React.FC<TotalPriceType> = ({
  listIdOrder,
  totalPrice,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(authState);
  const navigate = useNavigate();
  const location = useLocation();
  const openModal = () => {
    if (user) {
      dispatch(openConstructorModalAction());
    }
  };

  const getOrder = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
    } else dispatch<AppDispatch>(getOrderNum(listIdOrder));
  };

  return (
    <div className={styles.button_container}>
      <span className={styles.price_box}>
        <p className="text text_type_main-large">{totalPrice}</p>
        <div className={styles.icon}>
          <CurrencyIcon type="primary" />
        </div>
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
