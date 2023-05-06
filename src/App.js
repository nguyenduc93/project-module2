import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Instrument from "./components/page/Instrument";
import Guitar from "./components/page/Guitar";
import Accessory from "./components/page/Accessory";
import Learning from "./components/page/Learning";
import Notfound from "./components/page/Notfound";
import Register from "./registerandlogin/Register";
import Login from "./registerandlogin/Login";
import Cart from "./components/page/Cart";
import Detaill from "./components/page/Detaill";
import Admin from "./components/admin/Admin";
import AdminProduct from "./components/admin/AdminProduct";
import AdminUser from "./components/admin/AdminUser";
import AdminCart from "./components/admin/AdminCart";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/guitar" element={<Guitar />} />
        <Route path="page/nhaccu" element={<Instrument />} />
        <Route path="/page/phukien" element={<Accessory />} />
        <Route path="/page/tuhoc" element={<Learning />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/guitar/detail/:id" element={<Detaill />} />
        <Route path="/page/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/admin/cart" element={<AdminCart />} />

        <Route path="/*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
