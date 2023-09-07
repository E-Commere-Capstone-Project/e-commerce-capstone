import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOneProduct } from "../API/index.js";

export default function ViewProduct() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

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
  return (
    <>
      <p>View Product</p>
      <Link to="/products">
        <p>Back</p>
      </Link>
      {product && <p>{product.title}</p>}
      {error && <p>{error}</p>}
    </>
  );
}
