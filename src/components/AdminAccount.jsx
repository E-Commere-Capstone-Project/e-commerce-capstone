import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useShopUser from "./context/UserContext.jsx";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Select,
  Text,
  Button,
  Card,
  CardBody,
  Image,
  Stack,
  Divider,
  CardFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  fetchAdminUser,
  fetchAddNewProduct,
  fetchDeleteProduct,
  fetchProducts,
} from "../API/index.js";
import UpdateProduct from "./UpdateProduct.jsx";

export default function AdminAccount() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState(1);
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState("");
  const [productQty, setProductQty] = useState(0);
  const [products, setProducts] = useState([]);
  const [activeEdit, setActiveEdit] = useState(null);

  const localToken = localStorage.getItem("userToken");
  const { isLoggedIn } = useShopUser();
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
  }, [activeEdit]);

  useEffect(() => {
    async function AdminUserFetch() {
      try {
        if (!isLoggedIn) navigate("/");
        const data = await fetchAdminUser(JSON.parse(localToken));
        console.log(data);

        return setUser(data);
      } catch (error) {
        setErr(error);
        console.log(error);
      }
    }
    AdminUserFetch();
  }, [localToken]);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetchAddNewProduct(
      JSON.parse(localToken),
      productName,
      productDescription,
      Number(productCategory),
      Number(productPrice),
      productImage,
      Number(productQty)
    );
    setProductName("");
    setProductDescription("");
    setProductCategory(0);
    setProductPrice(0);
    setProductImage("");
    setProductQty(0);

    return response;
  }

  async function handleDeleteProduct(token, productId) {
    const response = await fetchDeleteProduct(token, productId);
    return response;
  }

  function handleProductsMap(products) {
    return products.map((product) => (
      <div key={product.id} className="product-cont">
        <Card
          className="product"
          justifyContent="space-between"
          size="md"
          borderRadius={0}
        >
          <CardBody>
            <Image src={product.product_image} alt={product.name} />
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
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() =>
                  activeEdit ? setActiveEdit(null) : setActiveEdit(product)
                }
              >
                Edit Product
              </Button>
              <Button
                variant="ghost"
                colorScheme="blue"
                onClick={() =>
                  handleDeleteProduct(JSON.parse(localToken), product.id)
                }
              >
                Delete
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </div>
    ));
  }

  return (
    <>
      {user && (
        <section id="admin-page">
          <div id="create-product-form">
            <form method="POST" onSubmit={handleSubmit} id="login-form">
              <Heading color="#532C38">Create new product</Heading>
              <FormControl isRequired>
                <FormLabel color="#734C58">Product Name</FormLabel>
                <Input
                  borderRadius="0"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />{" "}
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#734C58">Description</FormLabel>
                <Input
                  borderRadius="0"
                  type="text"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#734C58">Category</FormLabel>
                {/* <Input/> radio menu to select from the different categories */}
                <Select
                  borderRadius="0"
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <option value={0}>Select Category</option>
                  <option value={1}>Lips</option>
                  <option value={2}>Face</option>
                  <option value={3}>Eyes</option>
                  <option value={4}>Accessories</option>
                  <option value={5}>Highlighters</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#734C58">Price</FormLabel>
                <Input
                  borderRadius="0"
                  type="text"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#734C58">Product Image</FormLabel>
                <Input
                  borderRadius="0"
                  type="url"
                  value={productImage}
                  onChange={(e) => setProductImage(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="#734C58">Quantity in Stock</FormLabel>
                <Input
                  borderRadius="0"
                  type="number"
                  value={productQty}
                  onChange={(e) => setProductQty(e.target.value)}
                />
              </FormControl>
              <Button
                color="#532C38"
                fontSize={"1.2em"}
                borderRadius="0"
                marginTop="1.2em"
                onClick={handleSubmit}
              >
                Add
              </Button>
            </form>
          </div>
        </section>
      )}
      {activeEdit && (
        <UpdateProduct product={activeEdit} onSetActiveEdit={setActiveEdit} />
      )}
      <div id="products">{products && handleProductsMap(products)}</div>
    </>
  );
}
