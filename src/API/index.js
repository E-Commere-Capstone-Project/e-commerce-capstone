// USE for writing all the api calls
const API_URL = "https://fakestoreapi.com";
const PRODUCTS_API_URL = `${API_URL}/products`;

// GET all products
export async function fetchProducts() {
  try {
    const response = await fetch(PRODUCTS_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
fetchProducts();

// GET one product
export async function fetchOneProduct(productId) {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
