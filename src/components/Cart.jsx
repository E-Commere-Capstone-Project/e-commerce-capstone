// Page should have a mapping of all the cart data and also display quantities with a way to edit the quantity
// You can remove from cart on this page as well
// Access to check out from here as well
import { useEffect } from "react";
import useShopUser from "./context/UserContext.jsx";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
/*
Needs to import or receive data in relation to the cart itself and other data relevant
to the user; cart should have two functionalities, one as a guest checkout and one as a user checkout 
user should be authenticated for checkout process
*/
export default function Cart() {
  const { isLoggedIn, cart, addToCart, removeFromCart, updateProduct } =
    useShopUser();

  const navigate = useNavigate();

  // console.log(`cart cart`, cart);

  useEffect(() => {
    console.log(`useEffect`, cart);
    localStorage.setItem("localCart", JSON.stringify(cart));
  }, [cart]);

  function handleCartMap(cart) {
    return cart.map((product) => (
      <Card
        key={product.id}
        direction={{ base: "column", sm: "row" }}
        className="cart-product"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={product.image}
          alt={product.title}
        />
        <Stack className="cart-product-content">
          <CardBody>
            <Heading size="md">{product.title}</Heading>
            <Text py="2">${product.price}</Text>
          </CardBody>
          <CardFooter>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => {
                removeFromCart(product);
              }}
            >
              Remove from cart
            </Button>
            {product.qty > 1 && (
              <Button onClick={() => updateProduct(product)}>-</Button>
            )}
            <h4>{product.qty}</h4>
            <Button onClick={() => addToCart(product)}>+</Button>
          </CardFooter>
        </Stack>
        <p>Product Total: ${product.price * product.qty}</p>
      </Card>
    ));
  }

  const cartSubTotal = cart.reduce((acc, cv) => {
    let productTotal = cv.price * cv.qty;
    return acc + productTotal;
  }, 0);

  return (
    <div id="cart">
      {handleCartMap(cart)}
      {cart.length < 1 && (
        <>
          <Heading>There are no items in your cart</Heading>
          <Text onClick={() => navigate("/products")}>Start shopping now</Text>
        </>
      )}
      {cart.length > 0 && (
        <Card>
          <Heading>Cart Summary</Heading>
          <Stack>
            <Text>
              Subtotal -{" "}
              <NumericFormat
                value={cartSubTotal}
                prefix={"$"}
                decimalScale={2}
                thousandSeparator={true}
                displayType={"text"}
              />
            </Text>
            <Text>Shipping and Handling - $0.00</Text>
            <Text>Taxes - N/A</Text>
            <Text>
              TOTAL -{" "}
              <NumericFormat
                value={cartSubTotal}
                prefix={"$"}
                decimalScale={2}
                thousandSeparator={true}
                displayType={"text"}
              />
            </Text>
          </Stack>
          <CardFooter>
            <Button onClick={() => navigate("/cart/checkout")}>Checkout</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
