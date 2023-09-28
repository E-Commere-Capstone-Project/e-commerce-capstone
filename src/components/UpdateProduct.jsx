import { useState } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { fetchPatchProduct } from "../API/index.js";

export default function UpdateProduct({ product, onSetActiveEdit }) {
  const [productName, setProductName] = useState(product.name);
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [productCategory, setProductCategory] = useState(product.category_id);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productImage, setProductImage] = useState(product.product_image);
  const [productQty, setProductQty] = useState(product.quantity);

  const localToken = localStorage.getItem("userToken");

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetchPatchProduct(
      JSON.parse(localToken),
      product.id,
      productName,
      productDescription,
      Number(productCategory),
      Number(productPrice),
      productImage,
      Number(productQty)
    );
    onSetActiveEdit(null);
    return response;
  }
  return (
    <div>
      <form method="POST" onSubmit={handleSubmit} id="login-form">
        <Heading>Update Product</Heading>
        <FormControl isRequired>
          <FormLabel>Product Name</FormLabel>
          <Input
            type="text"
            value={productName}
            placeholder={productName}
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
        <button>Update</button>
      </form>
    </div>
  );
}
