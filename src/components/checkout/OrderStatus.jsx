import { Text, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function OrderStatus() {
  const navigate = useNavigate();
  return (
    <div>
      <Heading>Order Success!</Heading>
      <Text>Your items will arrive in the next 3 business days!</Text>
      <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
    </div>
  );
}
