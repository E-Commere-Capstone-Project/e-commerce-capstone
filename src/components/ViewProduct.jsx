import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOneProduct } from "../API/index.js";
import { Button, Image } from "@chakra-ui/react";
import useShopUser from "./context/UserContext.jsx";

export default function ViewProduct() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart, cart } = useShopUser();

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
              src={product.image}
              alt={product.title}
              maxW={{ base: "100%", sm: "450px" }}
            />
          </div>
          <div id="product-content-div">
            <h2>{product.title}</h2>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => addToCart(product)}
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
