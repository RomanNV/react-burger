import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

export default function RequiredAuth({ redirectTo, children }) {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const user = useSelector((state) => state.user.data);
  const location = useLocation();

  useEffect(() => {
    // dispatch(checkUserAuth());
  }, [dispatch]);

  if (!isAuthChecked) {
    return "Loaded...";
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  return <>{children}</>;
}
