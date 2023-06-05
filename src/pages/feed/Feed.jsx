import { useEffect } from "react";
import { FeedList } from "../../components/FeedList/FeedList";
import { FeedOrders } from "../../components/FeedOrders/FeedOrders";
import { useDispatch, useSelector } from "../../hooks/redux-hooks";
import {
  disconnectWsAction,
  startWsAction,
} from "../../services/actions/wsAction";
import { getWs } from "../../services/reducers/stateFuncs";
import { dataOrders } from "../../utils/mockesData";
import styles from "./Feed.module.css";

export const Feed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startWsAction());
    return () => {
      console.log("in close");
      dispatch(disconnectWsAction());
    };
  }, [dispatch]);
  const dataOrders = useSelector(getWs);

  return (
    <div className={styles.content_container}>
      <FeedList dataOrders={dataOrders.orders}></FeedList>
      <FeedOrders dataOrders={dataOrders}></FeedOrders>
    </div>
  );
};
