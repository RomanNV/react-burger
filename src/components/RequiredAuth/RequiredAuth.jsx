import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { authState } from "../../utils/funcs";

export default function RequiredAuth({
  redirectTo,
  children,
  onlyUnAuth = false,
}) {
  const { isAuthChecked, user } = useSelector(authState);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (onlyUnAuth && user) {
      // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
      // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
      navigate("/");
    }
  }, [user]);

  if (!isAuthChecked) {
    // Запрос еще выполняется
    return null;
  }

  if (!onlyUnAuth && !user) {
    // Сервер не ответил
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }
  return children;
  //state added need
}
