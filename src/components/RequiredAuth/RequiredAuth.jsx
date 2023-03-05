import { useSelector } from "react-redux";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { authState } from "../../utils/funcs";
import PropTypes from "prop-types";

export default function RequiredAuth({
  redirectTo,
  children,
  onlyUnAuth = false,
}) {
  const { isAuthChecked, user } = useSelector(authState);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    return null;
  }
  if (onlyUnAuth && user) {
    // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
    // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
    return location?.state?.from ? (
      <Navigate to={location?.state?.from} />
    ) : (
      <Navigate to={"/"} />
    );
  }

  if (!onlyUnAuth && !user) {
    // Сервер не ответил
    return <Navigate to={redirectTo} state={{ from: location.pathname }} />;
  }
  return children;
  //state added need
}
RequiredAuth.propTypes = {
  redirectTo: PropTypes.string,
  children: PropTypes.any,
  onlyUnAuth: PropTypes.bool,
};
