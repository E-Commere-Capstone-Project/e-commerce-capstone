import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import useShopUser from "./context/UserContext.jsx";
import {
  AiFillTag,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";

export default function Navbar() {
  const { isLoggedIn, changeIsLoggedIn, cart } = useShopUser();

  const navigate = useNavigate();

  // console.log("navbar", isLoggedIn);

  useEffect(() => {
    // if (isLoggedIn === true) return;
    // console.log(`login state`, isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {}, [cart]);

  function handleLogOut() {
    navigate("/");
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    changeIsLoggedIn(false);
    localStorage.setItem("userToken", JSON.stringify(null));
  }

  const cartQty = cart.reduce((acc, cv) => {
    return acc + cv.qty;
  }, 0);

  // console.log(`# of items in cart: `, cartQty);

  return (
    <header id="navbar">
      <Heading
        color="#dd3064"
        fontFamily="Playfair Display SC, serif"
        fontWeight="700"
        id="navbar-heading"
      >
        Status Quo
      </Heading>
      <div>
        <nav>
          <Link to="/" className="nav-tab">
            <button className="nav-tab-text">Home</button>
            <AiOutlineHome className="nav-tab-icon" />
          </Link>
          <Link to="/products" className="nav-tab">
            <button className="nav-tab-text">Shop</button>
            <AiFillTag className="nav-tab-icon" />
          </Link>
          <Link
            to={`/users/${isLoggedIn === true ? "profile" : "login"}`}
            className="nav-tab"
          >
            <button className="nav-tab-text">
              {isLoggedIn === true ? "Profile" : "Sign in"}
            </button>
            {isLoggedIn == true ? (
              <AiOutlineUser className="nav-tab-icon" />
            ) : (
              <RiLoginBoxLine className="nav-tab-icon" />
            )}
          </Link>
          {isLoggedIn === true && (
            <Link className="nav-tab">
              <button className="nav-tab-text" onClick={handleLogOut}>
                Log out
              </button>
              <RiLogoutBoxLine className="nav-tab-icon" />
            </Link>
          )}
          <Link to="/cart" className="nav-tab">
            <button className="nav-tab-text">
              <span id="cart-btn">
                <Text>Cart</Text>{" "}
                {isLoggedIn && cartQty > 0 && <Text>({cartQty})</Text>}
              </span>
            </button>
            <AiOutlineShoppingCart className="nav-tab-icon" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
