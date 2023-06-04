import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { Loader } from "../../components/Loader/Loader";
import { Order } from "../../components/Order/Order";
import { useDispatch } from "../../hooks/redux-hooks";
import { getOrderData } from "../../services/actions/getOrderData";
import { getDataOrders, getOrder } from "../../services/reducers/stateFuncs";
import { IsNotModal, OrderItem } from "../../types/commonTypes";

export const OrderDetailes = ({ isNotModal }) => {
  const { number } = useParams();
  const dispatch = useDispatch();
  const { isLoadingOneData, error, orderData } = useSelector(getDataOrders);
  const { orderItem } = useSelector(getOrder);
  useEffect(() => {
    dispatch(getOrderData(number));
  }, [dispatch, number]);

  const arrOfIngredientsOrder = useMemo(() => {
    const tempArr = orderData.orders;
    console.log(tempArr);

    return orderData;
  }, [orderData]);
  console.log(arrOfIngredientsOrder);

  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }
  return isLoadingOneData ? (
    <Loader></Loader>
  ) : (
    <Order orderData={arrOfIngredientsOrder} isNotModal={isNotModal}></Order>
  );
};
