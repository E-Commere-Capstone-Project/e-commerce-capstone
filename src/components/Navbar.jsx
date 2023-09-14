import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useEffect } from "react";
import useShopUser from "./context/UserContext.jsx";

export default function Navbar() {
  const localLoggedIn = localStorage.getItem("isLoggedIn");
  const localIsLoggedIn = JSON.parse(localLoggedIn);

  const { isLoggedIn, changeIsLoggedIn } = useShopUser();

  // console.log("navbar", isLoggedIn);

  useEffect(() => {
    // if (isLoggedIn === true) return;
    console.log(`login state`, isLoggedIn);
  }, [isLoggedIn]);

  function handleLogOut() {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    changeIsLoggedIn(false);
  }

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
          </ButtonGroup>
        </nav>
      </div>
    </header>
  );
}
