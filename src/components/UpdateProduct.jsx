import { useState } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  ButtonGroup,
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
    <div id="update-product-cont">
      <form method="POST" onSubmit={handleSubmit} id="login-form">
        <Heading color="#532C38">Update Product</Heading>
        <FormControl isRequired>
          <FormLabel color="#734C58">Product Name</FormLabel>
          <Input
            borderRadius="0"
            type="text"
            value={productName}
            placeholder={productName}
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
            color="#734C58"
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
        <ButtonGroup>
          <Button
            color="#532C38"
            fontSize={"1.2em"}
            borderRadius="0"
            marginTop="1.2em"
            onClick={handleSubmit}
          >
            Update
          </Button>
          <Button
            color="#532C38"
            fontSize={"1.2em"}
            borderRadius="0"
            marginTop="1.2em"
            onClick={() => onSetActiveEdit(null)}
          >
            Close
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}
