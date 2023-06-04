import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Error404 } from "../../pages/Error404/Error404";
import { Feed } from "../../pages/feed/Feed";
import { ForgotPassword } from "../../pages/forgotPassword/ForgotPassword";
import { Home } from "../../pages/home/Home";
import { Ingredient } from "../../pages/ingredient/Ingredient";
import { Login } from "../../pages/login/Login";
import { OrderPage } from "../../pages/orderPage/OrderPage";
import { OrderDetailes } from "../../pages/OrdersDetailes/OrderDetailes";
import { Profile } from "../../pages/profile/Profile";
import { RegisterPage } from "../../pages/registration/RegisterPage";
import { ResetPassword } from "../../pages/resetPassword/ResetPassword";
import { checkUserAuth } from "../../services/actions/auth";
import { getIngredientsData } from "../../services/actions/burgerIngredients";
import { getOrderData } from "../../services/actions/getOrderData";
import { AppHeader } from "../AppHeader/AppHeader";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { Modal } from "../Modal/Modal";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { RequiredAuth } from "../RequiredAuth/RequiredAuth";
import { UserProfileForm } from "../UserProfileForm/UserProfileForm";
import { dataOrders } from "../../utils/mockesData";

function App() {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIngredientsData());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <AppHeader></AppHeader>
      <Routes location={background || location}>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Error404 />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route
          path="/login"
          element={
            <RequiredAuth onlyUnAuth={true} redirectTo={""}>
              <Login />
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <RequiredAuth onlyUnAuth={true} redirectTo={""}>
              <RegisterPage />
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/forgot-password"
          element={
            <RequiredAuth onlyUnAuth={true} redirectTo={""}>
              <ForgotPassword />
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/reset-password"
          element={
            <RequiredAuth onlyUnAuth={true} redirectTo={""}>
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
          <Route index element={<UserProfileForm />}></Route>
          <Route path="orders" element={<OrderPage />}></Route>
        </Route>

        <Route
          path="/ingredients/:id"
          element={<Ingredient isNotModal={true}></Ingredient>}
        ></Route>
        <Route
          path="/profile/orders/:number"
          element={
            <RequiredAuth redirectTo={"/login"}>
              <OrderDetailes isNotModal={true}></OrderDetailes>
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/feed/:number"
          element={<OrderDetailes isNotModal={true}></OrderDetailes>}
        ></Route>
      </Routes>
      {background && (
        <Routes>
          (
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                closeModal={() => {
                  navigate("/");
                }}
              >
                <Ingredient isNotModal={false}></Ingredient>
              </Modal>
            }
          ></Route>
          <Route
            path="/feed/:number"
            element={
              <Modal
                closeModal={() => {
                  navigate(background.pathname);
                }}
              >
                <OrderDetailes isNotModal={false}></OrderDetailes>
              </Modal>
            }
          ></Route>
          <Route
            path="/profile/orders/:number"
            element={
              <Modal
                closeModal={() => {
                  navigate(background.pathname);
                }}
              >
                <OrderDetailes isNotModal={false}></OrderDetailes>
              </Modal>
            }
          ></Route>
          )
        </Routes>
      )}
    </>
  );
}

export default App;
