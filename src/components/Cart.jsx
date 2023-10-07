// Page should have a mapping of all the cart data and also display quantities with a way to edit the quantity
// You can remove from cart on this page as well
// Access to check out from here as well
import { useEffect, useState } from "react";
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
import {
  fetchCart,
  fetchUpdateCart,
  fetchRemoveFromCart,
  fetchRemoveCartAll,
} from "../API/index.js";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
/*
Needs to import or receive data in relation to the cart itself and other data relevant
to the user; cart should have two functionalities, one as a guest checkout and one as a user checkout 
user should be authenticated for checkout process
*/
export default function Cart() {
  const { isLoggedIn, cart, addToCart, removeFromCart, updateProduct } =
    useShopUser();

  const [userCart, setUserCart] = useState(null);
  const [err, setErr] = useState(null);

  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  // console.log(`cart cart`, cart);

  useEffect(() => {
    if (!isLoggedIn) navigate("/users/login");
    async function CartFetch() {
      try {
        const data = await fetchCart(JSON.parse(userToken));

        // console.log(data);

        return setUserCart(data);
      } catch (error) {
        setErr(error);
        console.log(error);
      }
    }
    CartFetch();
  }, [userToken]);

  useEffect(() => {
    // console.log(`useEffect`, cart);
    localStorage.setItem("localCart", JSON.stringify(cart));
  }, [cart]);

  async function handleRemoveFromCart(product) {
    removeFromCart(product);
    const response = await fetchRemoveFromCart(
      JSON.parse(userToken),
      product.id
    );
    return response;
  }

  async function handleUpdateCartLess(product) {
    updateProduct(product);
    const response = await fetchUpdateCart(
      JSON.parse(userToken),
      product.id,
      product.qty - 1
    );
    return response;
  }

  async function handleUpdateCartMore(product) {
    addToCart(product);
    const response = await fetchUpdateCart(
      JSON.parse(userToken),
      product.id,
      product.qty + 1
    );
    return response;
  }

  function handleCartMap(cart) {
    return cart.map((product) => (
      <Card
        key={product.id}
        direction={{ base: "row", md: "column" }}
        className="cart-product"
        borderRadius="0"
        display={{ base: "flex" }}
        flexFlow={{ base: "column wrap" }}
        gap={{ base: "0" }}
      >
        <CardBody display={{ base: "flex" }} gap={{ base: "1em" }}>
          <Image
            objectFit="cover"
            width={{ base: "40%", md: "200px" }}
            src={product.product_image}
            alt={product.name}
          />
          <Stack width={{ base: "60%" }}>
            <Heading
              fontFamily="fonts.body"
              fontSize={{ base: "1em", md: "1.5em" }}
              color="neutral.700"
              textAlign={"left"}
            >
              {product.name}
            </Heading>
            <Text
              fontSize={{ base: "1.3em" }}
              color="neutral.500"
              textAlign="left"
            >
              ${product.price}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter gap={{ base: "1em", md: "1.5em" }} alignItems="center">
          <Button
            variant="solid"
            color="neutral.700"
            fontSize={{ base: ".75em", md: "1.2em" }}
            borderRadius="0"
            padding={{ base: ".75em", md: "1em" }}
            onClick={() => {
              handleRemoveFromCart(product);
            }}
          >
            Remove from cart
          </Button>
          {product.qty > 1 && (
            <AiOutlineMinus
              color="neutral.700"
              fontSize={{ base: "1em", md: "2em" }}
              onClick={() => handleUpdateCartLess(product)}
            />
          )}
          <Text fontSize={{ base: "1em", md: "1.3em" }} color="neutral.600">
            {product.qty}
          </Text>
          <AiOutlinePlus
            color="neutral.700"
            fontSize={{ base: "1.5em", md: "2em" }}
            onClick={() => handleUpdateCartMore(product)}
          />
        </CardFooter>
      </Card>
    ));
  }

  const cartSubTotal = cart.reduce((acc, cv) => {
    let productTotal = cv.price * cv.qty;
    return acc + productTotal;
  }, 0);

  return (
    <div id="cart">
      {isLoggedIn && cart.length < 1 && (
        <div>
          <Heading color="neutral.700">There are no items in your cart</Heading>
          <Button
            onClick={() => navigate("/products")}
            variant="ghost"
            color="neutral.500"
            borderRadius="0"
          >
            Start shopping now
          </Button>
        </div>
      )}
      <div id="cart-contents">
        <div id="cart-list">{isLoggedIn && handleCartMap(cart)}</div>
        <div>
          {isLoggedIn && cart.length > 0 && (
            <Card id="cart-summary" borderRadius="0">
              <Heading
                fontFamily="fonts.body"
                fontSize={{ base: "2em", md: "3.5em" }}
                marginBottom=".5em"
                color="neutral.700"
              >
                Cart Summary
              </Heading>
              <Stack>
                <Text
                  fontSize={{ base: "1em", md: "1.3em" }}
                  color="neutral.500"
                >
                  Subtotal -{" "}
                  <NumericFormat
                    value={cartSubTotal}
                    prefix={"$"}
                    decimalScale={2}
                    thousandSeparator={true}
                    displayType={"text"}
                  />
                </Text>
                <Text
                  fontSize={{ base: "1em", md: "1.3em" }}
                  color="neutral.500"
                >
                  Shipping and Handling - $0.00
                </Text>
                <Text
                  fontSize={{ base: "1em", md: "1.3em" }}
                  color="neutral.500"
                >
                  Taxes - N/A
                </Text>
                <Text
                  fontSize={{ base: "1.3em", md: "2em" }}
                  color="neutral.600"
                >
                  Total -{" "}
                  <NumericFormat
                    value={cartSubTotal}
                    prefix={"$"}
                    decimalScale={2}
                    thousandSeparator={true}
                    displayType={"text"}
                  />
                </Text>
              </Stack>
              <CardFooter display="flex" justifyContent="center">
                <Button
                  onClick={() => navigate("/cart/checkout")}
                  fontSize={{ base: "1em", md: "1.3em" }}
                  color="neutral.600"
                  variant="solid"
                  borderRadius={0}
                >
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
