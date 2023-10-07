import { Text, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function OrderStatus() {
  const navigate = useNavigate();
  return (
    <div id="order-status-page">
      <Heading
        fontSize={{ base: "2.5em", md: "3.5em" }}
        color="brand.700"
        fontFamily="fonts.body"
      >
        Order Success!
      </Heading>
      <Text
        fontSize={{ base: "1em", md: "1.3em" }}
        padding={{ base: "1em 0em" }}
        color="neutral.600"
      >
        Your items will arrive in the next 3 business days!
      </Text>
      <Button
        color="neutral.700"
        fontSize={{ base: ".8em", md: "1.2em" }}
        onClick={() => navigate("/products")}
      >
        Continue Shopping
      </Button>
    </div>
  );
}
