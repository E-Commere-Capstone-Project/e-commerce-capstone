import { useEffect, useState } from "react";
import { fetchProducts } from "../API/index.js";
import { Link, useNavigate } from "react-router-dom";
import { orderBy } from "lodash";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(null);
  const [sorter, setSorter] = useState("id");
  const [order, setOrder] = useState("asc");

  const navigate = useNavigate();

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
      <div key={product.id} className="product">
        <Link to={`/products/${product.id}`}>View Product</Link>
        <h3 onClick={() => navigate(`/products/${product.id}`)}>
          {product.title}
        </h3>
        <p>${product.price}</p>
        {/* <p>{product.description}</p> */}
        {/* <img src={product.image} alt={product.title} /> */}
      </div>
    ));
  }

  const sortedProducts = orderBy(products, [sorter], [order]);

  console.log(sortedProducts);
  return (
    <>
      <p>Products</p>
      <div>
        <h3>Sort by: </h3>
        <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
          {order.charAt(0).toUpperCase() + order.slice(1)}
        </button>
        <button onClick={() => setSorter("title")}>Name</button>
        <button onClick={() => setSorter("price")}>Price</button>
        <button
          onClick={() => {
            setSorter("id");
            setOrder("asc");
          }}
        >
          Clear sort
        </button>
      </div>
      <div>{products && handleMapping(sortedProducts)}</div>

      {err && <h3>{err}</h3>}
    </>
  );
}
