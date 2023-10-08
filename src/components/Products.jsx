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
  Button,
  ButtonGroup,
  useToast,
  Box,
  useMediaQuery,
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
  const [loading, setLoading] = useState(false);

  // const [priceMin, setPriceMin] = useState(0);
  // const [priceMax, setPriceMax] = useState(10000);
  const toast = useToast();

  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  const { addToCart, cart, isLoggedIn } = useShopUser();

  const [isMobile] = useMediaQuery("(max-width: 400px)");

  useEffect(() => {
    setLoading(true);
    async function ProductsFetch() {
      try {
        const data = await fetchProducts();
        // console.log(data);
        if (data) {
          setLoading(false);
          return setProducts(data), setFilteredProducts(data);
        }
      } catch (error) {
        setLoading(false);
        setErr(error);
        console.log(error);
      }
    }
    ProductsFetch();
  }, []);

  useEffect(() => {
    // console.log(`useEffect`, cart);
    localStorage.setItem("localCart", JSON.stringify(cart));
  }, [cart]);

  function handleMapping(data) {
    return data.map((product) => (
      // Breakpoints
      // base: "0px", xxs: "320px", xs: "375px", sm: "425px", smMd: "575px", md: "768px", mgLg: "1024px", lg: "1200px", xl: "1400px",
      <div key={product.id} className="product-cont">
        <Card
          className="product"
          justifyContent="space-between"
          size={{ base: "sm", sm: "md", mdLg: "lg" }}
          borderRadius={0}
          height="100%"
        >
          <CardBody display={isMobile ? "flex" : "default"}>
            <Image
              src={product.product_image}
              alt={product.name}
              onClick={() => navigate(`/products/${product.id}`)}
              width={{ base: "40%", smMd: "100%" }}
            />
            <Stack width={{ base: "60%" }}>
              <Heading
                fontSize={{ base: "1em" }}
                textAlign={{ base: "left" }}
                color="neutral.800"
                fontFamily="fonts.body"
              >
                {product.name}
              </Heading>
              <Text
                color="neutral.500"
                fontSize={{ base: "1.2em", md: "1.5em" }}
                textAlign={{ base: "right" }}
              >
                ${product.price}
              </Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <ButtonGroup>
              <Button
                variant="solid"
                borderRadius="0"
                color="brand.600"
                fontSize={{ base: ".7em", md: "1em" }}
                // padding={isMobile ? ".25em" : "default"}
              >
                <Link to={`/products/${product.id}`}>View Product</Link>
              </Button>
              <Button
                variant="ghost"
                color="brand.400"
                borderRadius="0"
                fontSize={isMobile ? ".7em" : "1em"}
                onClick={() => {
                  // console.log(cart);
                  // addToCart(product);

                  if (!isLoggedIn) {
                    toast({
                      title: `You are not logged in.`,
                      description:
                        "You must be logged in to add items to your cart.",
                      status: "error",
                      duration: 2000,
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

  function handleFilterCategory(category) {
    setFilteredProducts(products);
    setCategory(category);
    const filteredCategory = filter(
      products,
      (product) => product.category_id === category
    );
    return setFilteredProducts(filteredCategory);
  }

  async function handleAddToCart(product) {
    addToCart(product);
    const response = await fetchAddToCart(JSON.parse(userToken), product.id, 1);
    return response;
  }

  return (
    <section id="products-page">
      <div id="product-sort-filter-cont">
        <div id="product-sorter">
          <Text fontSize={{ base: ".75em", lg: "1em" }}>Sort by: </Text>
          <ButtonGroup>
            <Button
              variant="ghost"
              color="brand.400"
              borderRadius={0}
              onClick={() => {
                handleSortProducts(sorter, order === "asc" ? "desc" : "asc");
              }}
              fontSize={{ base: ".5em", lg: ".75em" }}
            >
              {order === "asc" ? "Desc" : "Asc"}
            </Button>
            <Button
              variant="ghost"
              color="brand.400"
              borderRadius={0}
              onClick={() => {
                handleSortProducts("name");
              }}
              fontSize={{ base: ".5em", lg: ".75em" }}
            >
              Name
            </Button>
            <Button
              variant="solid"
              color="brand.400"
              borderRadius={0}
              onClick={() => {
                handleSortProducts("id", "asc");
              }}
              fontSize={{ base: ".5em", lg: ".75em" }}
            >
              Clear sort
            </Button>
          </ButtonGroup>
        </div>

        <div id="product-filter">
          <Text fontSize={{ base: ".75em", lg: "1em" }}>Filter by: </Text>
          <ButtonGroup>
            <Button
              variant="ghost"
              color="brand.400"
              borderRadius={0}
              onClick={() => {
                handleFilterCategory(1);
              }}
              fontSize={{ base: ".5em", lg: ".75em" }}
            >
              Lips
            </Button>
            <Button
              variant="ghost"
              color="brand.400"
              borderRadius={0}
              onClick={() => {
                handleFilterCategory(2);
              }}
              fontSize={{ base: ".5em", lg: ".75em" }}
            >
              Face
            </Button>
            <Button
              variant="ghost"
              color="brand.400"
              borderRadius={0}
              onClick={() => {
                handleFilterCategory(3);
              }}
              fontSize={{ base: ".5em", lg: ".75em" }}
            >
              Eyes
            </Button>
            <Button
              variant="ghost"
              color="brand.400"
              borderRadius={0}
              onClick={() => {
                handleFilterCategory(5);
              }}
              fontSize={{ base: ".5em", lg: ".75em" }}
            >
              Highlighters
            </Button>
            <Button
              variant="ghost"
              color="brand.400"
              borderRadius={0}
              onClick={() => {
                handleFilterCategory(4);
              }}
              fontSize={{ base: ".5em", lg: ".75em" }}
            >
              Accessories
            </Button>
            <Button
              variant="solid"
              color="brand.400"
              borderRadius={0}
              onClick={() => {
                setFilteredProducts(products);
              }}
              fontSize={{ base: ".5em", lg: ".75em" }}
            >
              Clear Category
            </Button>
          </ButtonGroup>
        </div>
      </div>
      {loading && (
        <div id="products-loading">
          <h1>Loading data...</h1>
        </div>
      )}
      <div id="products">{products && handleMapping(filteredProducts)}</div>

      {err && <h3>{err}</h3>}
    </section>
  );
}
