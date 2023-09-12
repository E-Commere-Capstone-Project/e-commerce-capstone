import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Products from "./components/Products.jsx";
import ViewProduct from "./components/ViewProduct.jsx";
import Footer from "./components/Footer.jsx";

import "./App.css";

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
      </Routes>

      <Footer />
    </UserProvider>
  );
}
