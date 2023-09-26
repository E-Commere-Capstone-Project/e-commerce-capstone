import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOneProduct } from "../API/index.js";
import { Button, Image, useToast } from "@chakra-ui/react";
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
        console.log(data);
        return setProduct(data);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    ProductFetch();
  }, [productId]);

  useEffect(() => {
    console.log(`useEffect`, cart);
    localStorage.setItem("localCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <p>View Product</p>
      <Button variant="solid" colorScheme="blue">
        <Link to="/products">
          <p>Back</p>
        </Link>
      </Button>

      {product && (
        <div id="product-main-div">
          <div id="product-image-div">
            <Image
              src={product.product_image}
              alt={product.name}
              maxW={{ base: "100%", sm: "450px" }}
            />
          </div>
          <div id="product-content-div">
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <Button
              variant="solid"
              colorScheme="blue"
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
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
}
