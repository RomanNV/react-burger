import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserOrdersList } from "../../components/UserOrdersList/UserOrdersList";
import { useDispatch } from "../../hooks/redux-hooks";
import {
  disconnectWsAction,
  startWsProtectedWsAction,
} from "../../services/actions/wsAction";
import { getWs } from "../../services/reducers/stateFuncs";

export const OrderPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startWsProtectedWsAction());
    return () => {
      dispatch(disconnectWsAction());
    };
  }, [dispatch]);

  const dataOrders = useSelector(getWs);
  return <UserOrdersList {...dataOrders}></UserOrdersList>;
};
