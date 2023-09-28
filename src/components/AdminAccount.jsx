import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  fetchPatchProduct,
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
        <Card className="product">
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
        <>
          <Heading>Admin Account</Heading>
          <div>
            <form method="POST" onSubmit={handleSubmit} id="login-form">
              <Heading>Create new product</Heading>
              <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />{" "}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                {/* <Input/> radio menu to select from the different categories */}
                <Select onChange={(e) => setProductCategory(e.target.value)}>
                  <option value={0}>Select Category</option>
                  <option value={1}>Lips</option>
                  <option value={2}>Face</option>
                  <option value={3}>Eyes</option>
                  <option value={4}>Accessories</option>
                  <option value={5}>Highlighters</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  type="text"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Product Image</FormLabel>
                <Input
                  type="url"
                  value={productImage}
                  onChange={(e) => setProductImage(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Quantity in Stock</FormLabel>
                <Input
                  type="number"
                  value={productQty}
                  onChange={(e) => setProductQty(e.target.value)}
                />
              </FormControl>
              <button>Add</button>
            </form>
            <form>
              <h2>Update a product</h2>
            </form>
            <form>
              <h2>Delete a product</h2>
            </form>
          </div>
        </>
      )}
      {activeEdit && (
        <UpdateProduct product={activeEdit} onSetActiveEdit={setActiveEdit} />
      )}
      <div>{products && handleProductsMap(products)}</div>
    </>
  );
}
