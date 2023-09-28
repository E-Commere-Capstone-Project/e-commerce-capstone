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
  fetchAddToCart,
  fetchUpdateCart,
  fetchRemoveFromCart,
  fetchRemoveCartAll,
} from "../API/index.js";
import { update } from "lodash";
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
    async function CartFetch() {
      try {
        if (!isLoggedIn) navigate("/users/login");
        const data = await fetchCart(JSON.parse(userToken));

        console.log(data);

        return setUserCart(data);
      } catch (error) {
        setErr(error);
        console.log(error);
      }
    }
    CartFetch();
  }, [userToken]);

  useEffect(() => {
    console.log(`useEffect`, cart);
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
        direction={{ base: "column", sm: "row" }}
        className="cart-product"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={product.product_image}
          alt={product.name}
        />
        <Stack className="cart-product-content">
          <CardBody>
            <Heading size="lg" color="#532C38" textAlign={"left"}>
              {product.name}
            </Heading>
            <Text fontSize="1.3em" color="#734C58" textAlign="left">
              ${product.price}
            </Text>
          </CardBody>
          <CardFooter gap="1.5em" alignItems="center">
            <Button
              variant="solid"
              color="#532C38"
              fontSize={"1.2em"}
              onClick={() => {
                handleRemoveFromCart(product);
              }}
            >
              Remove from cart
            </Button>
            {product.qty > 1 && (
              <AiOutlineMinus
                color="#532C38"
                fontSize={"2em"}
                onClick={() => handleUpdateCartLess(product)}
              />
            )}
            <Text fontSize="1.3em" color="#734C58">
              {product.qty}
            </Text>
            <AiOutlinePlus
              color="#532C38"
              fontSize={"2em"}
              onClick={() => handleUpdateCartMore(product)}
            />
          </CardFooter>
        </Stack>
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
          <Heading color="#532C38">There are no items in your cart</Heading>
          <Button
            onClick={() => navigate("/products")}
            variant="ghost"
            color="#886670"
          >
            Start shopping now
          </Button>
        </div>
      )}
      <div id="cart-contents">
        <div id="cart-list">{isLoggedIn && handleCartMap(cart)}</div>
        <div>
          {isLoggedIn && cart.length > 0 && (
            <Card id="cart-summary">
              <Heading fontSize={"3.5em"} marginBottom=".5em" color="#532C38">
                Cart Summary
              </Heading>
              <Stack>
                <Text fontSize={"1.3em"} color="#886670">
                  Subtotal -{" "}
                  <NumericFormat
                    value={cartSubTotal}
                    prefix={"$"}
                    decimalScale={2}
                    thousandSeparator={true}
                    displayType={"text"}
                  />
                </Text>
                <Text fontSize={"1.3em"} color="#886670">
                  Shipping and Handling - $0.00
                </Text>
                <Text fontSize={"1.3em"} color="#886670">
                  Taxes - N/A
                </Text>
                <Text fontSize={"2em"} color="#734C58">
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
                  fontSize={"1.3em"}
                  color="#734C58"
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
