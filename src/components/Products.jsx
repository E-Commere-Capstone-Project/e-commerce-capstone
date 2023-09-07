import { useEffect, useState } from "react";
import { fetchProducts } from "../API/index.js";
import { Link, useNavigate } from "react-router-dom";
import { orderBy, filter } from "lodash";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(null);
  const [sorter, setSorter] = useState("id");
  const [order, setOrder] = useState("asc");
  const [category, setCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10000);

  const navigate = useNavigate();

  useEffect(() => {
    async function ProductsFetch() {
      try {
        const data = await fetchProducts();
        console.log(data);

        return setProducts(data), setFilteredProducts(data);
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

  function handleSortProducts(sorter, order) {
    setSorter(sorter);
    setOrder(order);
    const sortedProducts = orderBy(
      filteredProducts === products ? products : filteredProducts,
      [sorter],
      [order]
    );
    return setFilteredProducts(sortedProducts);
  }

  // const orderButton = order.charAt(0).toUpperCase() + order.slice(1);

  function handleFilterCategory(category) {
    setFilteredProducts(products);
    setCategory(category);
    const filteredCategory = filter(
      products,
      (product) => product.category === category
    );
    return setFilteredProducts(filteredCategory);
  }

  // function handleFilterPrice(min, max) {
  //   setFilteredProducts(products);
  //   const filteredPrice = filter(
  //     products,
  //     (product) => product.price >= min && product.price <= max
  //   );
  //   return setFilteredProducts(filteredPrice);
  // }

  console.log(filteredProducts);
  return (
    <>
      <p>Products</p>
      <div>
        <h3>Sort by: </h3>
        <button
          onClick={() => {
            handleSortProducts(sorter, order === "asc" ? "desc" : "asc");
          }}
        >
          {order === "asc" ? "Desc" : "Asc"}
        </button>
        <button
          onClick={() => {
            handleSortProducts("title");
          }}
        >
          Name
        </button>
        <button
          onClick={() => {
            handleSortProducts("price");
          }}
        >
          Price
        </button>
        <button
          onClick={() => {
            handleSortProducts("id", "asc");
          }}
        >
          Clear sort
        </button>
      </div>

      <div>
        <h3>Filter by: </h3>
        <p>Category: </p>
        <button
          onClick={() => {
            handleFilterCategory("electronics");
          }}
        >
          Electronics
        </button>
        <button
          onClick={() => {
            handleFilterCategory("jewelery");
          }}
        >
          Jewelry
        </button>
        <button
          onClick={() => {
            handleFilterCategory("men's clothing");
          }}
        >
          Men&apos;s Clothing
        </button>
        <button
          onClick={() => {
            handleFilterCategory("women's clothing");
          }}
        >
          Women&apos;s Clothing
        </button>
        <button
          onClick={() => {
            setFilteredProducts(products);
          }}
        >
          Clear Category
        </button>
        {/* <p>Price: </p>
        <label>
          Min:
          <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
          />
        </label>
        <label>
          Max:
          <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
          />
        </label> */}
      </div>
      <div>{products && handleMapping(filteredProducts)}</div>

      {err && <h3>{err}</h3>}
    </>
  );
}
