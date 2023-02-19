import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error404 } from "../../pages/Error404/Error404";
import { ForgotPassword } from "../../pages/forgotPassword/ForgotPassword";
import { Home } from "../../pages/home/Home";
import { Login } from "../../pages/login/Login";
import { Profile } from "../../pages/profile/Profile";
import { RegisterPage } from "../../pages/registration/RegisterPage";
import { ResetPassword } from "../../pages/resetPassword/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Error404 />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
