import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error404 } from "../../pages/Error404/Error404";
import { Home } from "../../pages/home/Home";
import { Login } from "../../pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Error404 />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
