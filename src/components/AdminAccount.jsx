import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import {
  fetchAdminUser,
  fetchAddNewProduct,
  fetchPatchProduct,
  fetchDeleteProduct,
} from "../API/index.js";

export default function AdminAccount() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState(1);
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState("");
  const [productQty, setProductQty] = useState(0);

  const localToken = localStorage.getItem("userToken");

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

  async function handleSubmit() {
    return;
  }

  return (
    <>
      {user && (
        <>
          <h1>Admin Account</h1>
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
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                {/* <Input/> radio menu to select from the different categories */}
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Product Image</FormLabel>
                <Input type="url" />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity in Stock</FormLabel>
                <Input type="number" />
              </FormControl>
              {/* fetchAddNewProduct(
  token,
  name,
  description,
  category_id,
  price,
  product_image,
  quantity */}
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
    </>
  );
}
