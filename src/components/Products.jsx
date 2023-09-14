import { useEffect, useState } from "react";
import { fetchProducts } from "../API/index.js";
import { Link, useNavigate } from "react-router-dom";
import { orderBy, filter } from "lodash";
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

import useShopUser from "./context/UserContext.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(null);
  const [sorter, setSorter] = useState("id");
  const [order, setOrder] = useState("asc");
  const [category, setCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [priceMin, setPriceMin] = useState(0);
  // const [priceMax, setPriceMax] = useState(10000);

  const navigate = useNavigate();

  const { addToCart, removeFromCart, cart } = useShopUser();

  useEffect(() => {
    async function ProductsFetch() {
      try {
        const data = await fetchProducts();

        // if (!localCart) localStorage.setItem("localCart", JSON.stringify([]));

        console.log(data);

        return setProducts(data), setFilteredProducts(data);
      } catch (error) {
        setErr(error);
        console.log(error);
      }
    }
    ProductsFetch();
  }, []);

  useEffect(() => {
    console.log(`useEffect`, cart);
    localStorage.setItem("localCart", JSON.stringify(cart));
  }, [cart]);

  function handleMapping(data) {
    return data.map((product) => (
      // <div key={product.id} className="product">
      //   <Link to={`/products/${product.id}`}>View Product</Link>
      //   <h3 onClick={() => navigate(`/products/${product.id}`)}>
      //     {product.title}
      //   </h3>
      //   <p>${product.price}</p>
      //   {/* <p>{product.description}</p> */}
      //   {/* <img src={product.image} alt={product.title} /> */}
      // </div>
      <div key={product.id} className="product-cont">
        <Card className="product">
          <CardBody>
            <Image
              src={product.image}
              alt={product.title}
              onClick={() => navigate(`/products/${product.id}`)}
            />
            <Stack>
              <Heading size="md">{product.title}</Heading>
              <Text color="blue.600" fontSize="2xl">
                ${product.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup>
              <Button variant="solid" colorScheme="blue">
                <Link to={`/products/${product.id}`}>View Product</Link>
              </Button>
              <Button
                variant="ghost"
                colorScheme="blue"
                onClick={() => {
                  // console.log(cart);
                  // addToCart(product);
                  handleAddToCart(product);
                }}
              >
                Add to cart
              </Button>
              {/* <Button
                variant="ghost"
                colorScheme="blue"
                onClick={() => {
                  // console.log(cart);
                  removeFromCart(product);
                }}
              >
                Remove from cart
              </Button> */}
            </ButtonGroup>
          </CardFooter>
        </Card>
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

  function handleAddToCart(product) {
    addToCart(product);
  }

  console.log(filteredProducts);

  return (
    <>
      <div>
        <h3>Sort by: </h3>
        <ButtonGroup>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleSortProducts(sorter, order === "asc" ? "desc" : "asc");
            }}
          >
            {order === "asc" ? "Desc" : "Asc"}
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleSortProducts("title");
            }}
          >
            Name
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleSortProducts("price");
            }}
          >
            Price
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleSortProducts("id", "asc");
            }}
          >
            Clear sort
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <h3>Filter by: </h3>
        <p>Category: </p>
        <ButtonGroup>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleFilterCategory("electronics");
            }}
          >
            Electronics
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleFilterCategory("jewelery");
            }}
          >
            Jewelry
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleFilterCategory("men's clothing");
            }}
          >
            Men&apos;s Clothing
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleFilterCategory("women's clothing");
            }}
          >
            Women&apos;s Clothing
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              setFilteredProducts(products);
            }}
          >
            Clear Category
          </Button>
        </ButtonGroup>
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
      <div id="products">{products && handleMapping(filteredProducts)}</div>

      {err && <h3>{err}</h3>}
    </>
  );
}
