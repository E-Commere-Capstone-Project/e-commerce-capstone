import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Products from "./components/Products.jsx";
import ViewProduct from "./components/ViewProduct.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Register from "./components/Register.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import OrderStatus from "./components/checkout/OrderStatus.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminAccount from "./components/AdminAccount.jsx";
import Footer from "./components/Footer.jsx";

import "./App.scss";

import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/context/UserContext.jsx";

export default function App() {
  return (
    <UserProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ViewProduct />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/admin/login" element={<AdminLogin />} />
        <Route path="/users/admin/account" element={<AdminAccount />} />
        <Route path="/users/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/cart/checkout/success" element={<OrderStatus />} />
      </Routes>

      <Footer />
    </UserProvider>
  );
}
