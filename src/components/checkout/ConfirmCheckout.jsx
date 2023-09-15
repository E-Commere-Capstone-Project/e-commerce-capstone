import { Heading, Button, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useShopUser from "../context/UserContext";

export default function ConfirmCheckout({ activeStep, onSetActiveStep }) {
  const navigate = useNavigate();
  const { cart, clearCart } = useShopUser();

  // useEffect(() => {
  //   console.log(`confirm checkout`, cart);

  // }, [cart]);

  function handleCheckOut() {
    navigate("/cart/checkout/success");
    // clear the cart on local storage and for the current context
    localStorage.removeItem("localCart");
    clearCart();
  }
  return (
    <div className="checkout-tabs">
      <Heading>Review and Place Order</Heading>
      <ButtonGroup>
        <Button onClick={() => onSetActiveStep(activeStep - 1)}>Back</Button>
        <Button onClick={handleCheckOut}>Place order</Button>
      </ButtonGroup>
    </div>
  );
}
