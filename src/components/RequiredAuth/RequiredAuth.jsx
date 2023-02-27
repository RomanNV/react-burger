import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { checkUserAuth } from "../../services/actions/auth";
import { authState } from "../../utils/funcs";

export default function RequiredAuth({ redirectTo, children }) {
  const dispatch = useDispatch();
  const { isAuthChecked, user } = useSelector(authState);
  const location = useLocation();
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log("in use effect");
  //   dispatch(checkUserAuth());
  // }, []);

  useEffect(() => {
    if (!user) {
      navigate(redirectTo, { state: { from: location.pathname } });
    }
  }, [user, navigate]);

  // if (!isAuthChecked) {
  //   return "Loaded...";
  // }

  //state added need
  return <>{children}</>;
}
