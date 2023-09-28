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
  useToast,
  Box,
} from "@chakra-ui/react";

import useShopUser from "./context/UserContext.jsx";
import { fetchAddToCart } from "../API/index.js";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(null);
  const [sorter, setSorter] = useState("id");
  const [order, setOrder] = useState("asc");
  const [category, setCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [priceMin, setPriceMin] = useState(0);
  // const [priceMax, setPriceMax] = useState(10000);
  const toast = useToast();

  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  const { addToCart, cart, isLoggedIn } = useShopUser();

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
              src={product.product_image}
              alt={product.name}
              onClick={() => navigate(`/products/${product.id}`)}
            />
            <Stack>
              <Heading size="md">{product.name}</Heading>
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
                    handleAddToCart(product);
                  }
                }}
              >
                Add to cart
              </Button>
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
      (product) => product.category_id === category
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

  async function handleAddToCart(product) {
    addToCart(product);
    const response = await fetchAddToCart(JSON.parse(userToken), product.id, 1);
    return response;
  }

  console.log(filteredProducts);

  return (
    <>
      <div id="product-sorter">
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
              handleSortProducts("name");
            }}
          >
            Name
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

      <div id="product-filter">
        <h3>Filter by: </h3>
        <ButtonGroup>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleFilterCategory(1);
            }}
          >
            Lips
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleFilterCategory(2);
            }}
          >
            Face
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleFilterCategory(3);
            }}
          >
            Eyes
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleFilterCategory(5);
            }}
          >
            Highlighters
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              handleFilterCategory(4);
            }}
          >
            Accessories
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
      </div>
      <div id="products">{products && handleMapping(filteredProducts)}</div>

      {err && <h3>{err}</h3>}
    </>
  );
}
