import { Link } from "react-router-dom";
import { Button, ButtonGroup, Heading, Text } from "@chakra-ui/react";
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
      >
        Status Quo
      </Heading>
      <div>
        <nav>
          <ButtonGroup>
            <Link to="/">
              <Button
                borderRadius="0"
                variant="ghost"
                color=" #F8769D"
                fontSize={"1.3em"}
              >
                Home
              </Button>
            </Link>
            <Link to="/products">
              <Button
                borderRadius="0"
                variant="ghost"
                color="#F8769D"
                fontSize={"1.3em"}
              >
                Products
              </Button>
            </Link>
            <Link to={`/users/${isLoggedIn === true ? "Profile" : "login"}`}>
              <Button
                borderRadius="0"
                variant="ghost"
                color="#F8769D"
                fontSize={"1.3em"}
              >
                {isLoggedIn === true ? "Profile" : "Sign in"}
              </Button>
            </Link>
            {isLoggedIn === true && (
              <Button
                borderRadius="0"
                variant="ghost"
                color="#F8769D"
                fontSize={"1.3em"}
                onClick={handleLogOut}
              >
                Log out
              </Button>
            )}
            <Link to="/cart">
              <Button
                borderRadius="0"
                variant="solid"
                color="#EC507F"
                fontSize={"1.3em"}
              >
                Cart {isLoggedIn && cartQty > 0 && <Text>({cartQty})</Text>}
              </Button>
            </Link>
          </ButtonGroup>
        </nav>
      </div>
    </header>
  );
}
