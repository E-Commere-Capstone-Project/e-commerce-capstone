import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOneProduct } from "../API/index.js";
import {
  Button,
  Image,
  useToast,
  ButtonGroup,
  Heading,
  Text,
} from "@chakra-ui/react";
import useShopUser from "./context/UserContext.jsx";

export default function ViewProduct() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart, cart, isLoggedIn } = useShopUser();

  const toast = useToast();

  let { productId } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    async function ProductFetch() {
      try {
        const data = await fetchOneProduct(productId);
        // console.log(data);
        return setProduct(data);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    ProductFetch();
  }, [productId]);

  useEffect(() => {
    // console.log(`useEffect`, cart);
    localStorage.setItem("localCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <section id="view-product-page">
      {product && (
        <div id="product-main-div">
          <div id="product-image-div">
            <Image
              src={product.product_image}
              alt={product.name}
              maxW={{ base: "100%", md: "450px" }}
            />
          </div>
          <div id="product-content-div">
            <Heading
              color="brand.700"
              fontFamily="fonts.body"
              fontSize={{ base: "1.8em" }}
            >
              {product.name}
            </Heading>
            <Text fontSize={{ base: "1em" }} color="neutral.500">
              {product.description}
            </Text>
            <Text fontSize={{ base: "1em" }} color="neutral.700">
              ${product.price}
            </Text>
            <ButtonGroup>
              <Button
                borderRadius="0"
                variant="solid"
                color="#532C38"
                onClick={() => {
                  if (!isLoggedIn) {
                    toast({
                      title: `You are not logged in.`,
                      description:
                        "You must be logged in to add items to your cart.",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                      position: "bottom",
                    });
                  } else {
                    addToCart(product);
                  }
                }}
              >
                Add to cart
              </Button>
              <Button variant="ghost" color="#532C38" borderRadius="0">
                <Link to="/products">
                  <Text>Back</Text>
                </Link>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </section>
  );
}
