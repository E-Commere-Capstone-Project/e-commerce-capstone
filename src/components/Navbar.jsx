import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";

export default function Navbar() {
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
          </ButtonGroup>
        </nav>
      </div>
    </header>
  );
}
