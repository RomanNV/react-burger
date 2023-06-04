import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UserOrdersList } from "../../components/UserOrdersList/UserOrdersList";
import { dataOrders } from "../../utils/mockesData";

export const OrderPage = () => {
  return <UserOrdersList dataOrders={dataOrders}></UserOrdersList>;
};
