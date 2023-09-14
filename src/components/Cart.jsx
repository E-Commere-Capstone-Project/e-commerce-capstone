// Page should have a mapping of all the cart data and also display quantities with a way to edit the quantity
// You can remove from cart on this page as well
// Access to check out from here as well
import useShopUser from "./context/UserContext.jsx";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { NumericFormat, numericFormatter } from "react-number-format";
/*
Needs to import or receive data in relation to the cart itself and other data relevant
to the user; cart should have two functionalities, one as a guest checkout and one as a user checkout 
user should be authenticated for checkout process
*/
export default function Cart() {
  const { isLoggedIn, cart, addToCart, removeFromCart, updateProduct } =
    useShopUser();

  // console.log(`cart cart`, cart);
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
  return (
    <div id="cart">
      {handleCartMap(cart)}
      <div>
        <p>Cart Total: </p>
        <NumericFormat
          value={cart.reduce((acc, cv) => {
            let productTotal = cv.price * cv.qty;
            return acc + productTotal;
          }, 0)}
          prefix={"$"}
          decimalScale={2}
          thousandSeparator={true}
          displayType={"text"}
        />
      </div>
    </div>
  );
}
/*
  
 cart.map(item => {
  <>
  image
  title
  way to change the quantity
  a trash icon to be able to remove from cart
  </>
 }) 
  
 Display the total and should update in real time as items are added or removed

 button to direct to check out 

  */
