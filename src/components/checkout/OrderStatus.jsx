import { Text, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function OrderStatus() {
  const navigate = useNavigate();
  return (
    <div id="order-status-page">
      <Heading fontSize="3.5em" color="#532C38">
        Order Success!
      </Heading>
      <Text fontSize="1.3em" padding="1em 0em" color="#734C58">
        Your items will arrive in the next 3 business days!
      </Text>
      <Button
        color="#532C38"
        fontSize="1.2em"
        onClick={() => navigate("/products")}
      >
        Continue Shopping
      </Button>
    </div>
  );
}
