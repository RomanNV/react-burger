import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { authState } from "../../services/reducers/stateFuncs";
import {
  RequiredAuthType,
  RequiredAuthRedirectType,
} from "../../types/commonTypes";

export const RequiredAuth: React.FC<
  RequiredAuthRedirectType & RequiredAuthType
> = ({ redirectTo, children, onlyUnAuth = false }) => {
  const { isAuthChecked, user } = useSelector(authState);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется

    return null;
  }
  if (onlyUnAuth && user) {
    console.log(onlyUnAuth, user, location?.state?.from);

    // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
    // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
    return location?.state?.from ? (
      <Navigate to={location?.state?.from} />
    ) : (
      <Navigate to={"/"} />
    );
  }

  if (!onlyUnAuth && !user) {
    console.log("lllll");

    // Сервер не ответил
    return <Navigate to={redirectTo} state={{ from: location.pathname }} />;
  }
  return children;
  //state added need
};
