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
    <section id="confirm-checkout-cont">
      <div id="confirm-checkout">
        <Heading color="#532C38">Review and Place Order</Heading>
        <ButtonGroup marginTop="3em" gap=".5em">
          <Button
            borderRadius="0"
            color="#532C38"
            onClick={() => onSetActiveStep(activeStep - 1)}
          >
            Back
          </Button>
          <Button borderRadius="0" color="#532C38" onClick={handleCheckOut}>
            Place order
          </Button>
        </ButtonGroup>
      </div>
    </section>
  );
}
