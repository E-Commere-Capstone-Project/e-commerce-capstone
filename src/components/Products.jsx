import { useEffect, useState } from "react";
import { fetchProducts } from "../API/index.js";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function ProductsFetch() {
      try {
        const data = await fetchProducts();
        console.log(data);
        return setProducts(data);
      } catch (error) {
        setErr(error);
        console.log(error);
      }
    }
    ProductsFetch();
  }, []);

  function handleMapping(data) {
    return data.map((product) => (
      <div key={product.id}>
        <h3>{product.title}</h3>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <img src={product.image} alt={product.title} />
      </div>
    ));
  }
  return (
    <>
      <p>Products</p>
      <div>{products && handleMapping(products)}</div>
      {err && <h3>{err}</h3>}
    </>
  );
}
