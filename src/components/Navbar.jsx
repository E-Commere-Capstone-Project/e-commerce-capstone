import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useEffect } from "react";
import useShopUser from "./context/UserContext.jsx";

export default function Navbar() {
  const { isLoggedIn, changeIsLoggedIn, cart } = useShopUser();

  // console.log("navbar", isLoggedIn);

  useEffect(() => {
    // if (isLoggedIn === true) return;
    console.log(`login state`, isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {}, [cart]);

  function handleLogOut() {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    changeIsLoggedIn(false);
  }

  const cartQty = cart.reduce((acc, cv) => {
    return acc + cv.qty;
  }, 0);

  // console.log(`# of items in cart: `, cartQty);

  return (
    <header id="navbar">
      <h1>Status Quo</h1>
      <div>
        <nav>
          <ButtonGroup>
            <Link to="/">
              <Button variant="solid" colorScheme="blue">
                Home
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="solid" colorScheme="blue">
                Products
              </Button>
            </Link>
            <Link to={`/users/${isLoggedIn === true ? "Profile" : "login"}`}>
              <Button variant="solid" colorScheme="blue">
                {isLoggedIn === true ? "Profile" : "Sign in"}
              </Button>
            </Link>
            {isLoggedIn === true && (
              <Button variant="solid" colorScheme="blue" onClick={handleLogOut}>
                Log out
              </Button>
            )}
            <Link to="/cart">
              <Button variant="solid" colorScheme="blue">
                Cart ({cartQty})
              </Button>
            </Link>
          </ButtonGroup>
        </nav>
      </div>
    </header>
  );
}
