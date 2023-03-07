import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { Error404 } from "../../pages/Error404/Error404";
import { ForgotPassword } from "../../pages/forgotPassword/ForgotPassword";
import { Home } from "../../pages/home/Home";
import { Ingredient } from "../../pages/ingredient/Ingredient";
import { Login } from "../../pages/login/Login";
import { OrderPage } from "../../pages/orderPage/OrderPage";
import { Profile } from "../../pages/profile/Profile";
import { RegisterPage } from "../../pages/registration/RegisterPage";
import { ResetPassword } from "../../pages/resetPassword/ResetPassword";
import { checkUserAuth } from "../../services/actions/auth";
import { getIngredientsData } from "../../services/actions/burgerIngredients";
import RequiredAuth from "../RequiredAuth/RequiredAuth";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredientsData());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Error404 />}></Route>
        <Route
          path="/login"
          element={
            <RequiredAuth onlyUnAuth={true}>
              <Login />
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <RequiredAuth onlyUnAuth={true}>
              <RegisterPage />
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/forgot-password"
          element={
            <RequiredAuth onlyUnAuth={true}>
              <ForgotPassword />
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/reset-password"
          element={
            <RequiredAuth onlyUnAuth={true}>
              <ResetPassword />
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="profile"
          element={
            <RequiredAuth redirectTo={"/login"}>
              <Profile />
            </RequiredAuth>
          }
        >
          <Route path="orders" element={<OrderPage />}></Route>
        </Route>

        <Route path="/ingredients/:id" element={<Ingredient />}></Route>
      </Routes>
      {background && (
        <Routes>
          (<Route path="/ingredients/:id" element={<Ingredient />}></Route>)
        </Routes>
      )}
    </>
  );
}

export default App;
