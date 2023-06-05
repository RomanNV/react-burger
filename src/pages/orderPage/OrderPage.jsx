import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserOrdersList } from "../../components/UserOrdersList/UserOrdersList";
import { useDispatch } from "../../hooks/redux-hooks";
import {
  disconnectWsAction,
  startWsProtectedWsAction,
} from "../../services/actions/wsAction";
import { getWs } from "../../services/reducers/stateFuncs";

export const OrderPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startWsProtectedWsAction());
    return () => {
      console.log("in close");
      dispatch(disconnectWsAction());
    };
  }, [dispatch]);

  const dataOrders = useSelector(getWs);
  console.log(dataOrders);
  return <UserOrdersList dataOrders={dataOrders}></UserOrdersList>;
};
