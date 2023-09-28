// USE for writing all the api calls
const API_URL = "https://e-commerce-server-capstone.onrender.com/api";
const PRODUCTS_API_URL = `${API_URL}/products`;
const LOGIN_API_URL = `${API_URL}/users/login`;
const USERS_API_URL = `${API_URL}/users`;
const CART_API_URL = `${API_URL}/cart`;

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

// POST new product
export async function fetchAddNewProduct(
  token,
  name,
  description,
  category_id,
  price,
  product_image,
  quantity
) {
  try {
    const response = await fetch(PRODUCTS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        category_id: category_id,
        price: price,
        product_image: product_image,
        quantity: quantity,
      }),
    });
    const result = await response.json();
    // console.log("API: ADDED NEW PRODUCT ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// PATCH product info
export async function fetchPatchProduct(
  token,
  productId,
  name,
  description,
  category_id,
  price,
  product_image,
  quantity
) {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        category_id: category_id,
        price: price,
        product_image: product_image,
        quantity: quantity,
      }),
    });
    const result = await response.json();
    // console.log("API: UPDATED PRODUCT ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// DELETE product
export async function fetchDeleteProduct(token, productId) {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    // console.log("API: DELETED PRODUCT ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

//GET User account
export async function fetchAccount(token) {
  try {
    const response = await fetch(`${USERS_API_URL}/account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// POST User login
export async function fetchLogin(username, password) {
  try {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    console.error(`Logged in user`, error);
  }
}

// POST register a new user
export async function fetchRegisterUser(
  username,
  password,
  firstName,
  lastName,
  telephone
) {
  try {
    const response = await fetch(`${USERS_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        telephone: telephone,
      }),
    });
    const result = await response.json();
    // console.log(`API: New registered user`, result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// DELETE user
export async function fetchDeleteUser(userId, token) {
  try {
    const response = await fetch(`${USERS_API_URL}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    // console.log(`User deleted`, result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// PATCH edit a users data
// export async function fetchUpdateUser(
//   userId,
//   token,
//   email,
//   username,
//   password,
//   firstName,
//   lastName,
//   phone
// ) {
//   try {
//     const response = await fetch(`${USERS_API_URL}/${userId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         email: email,
//         username: username,
//         password: password,
//         name: {
//           firstName: firstName,
//           lastName: lastName,
//         },
//         phone: phone,
//       }),
//     });
//     const result = await response.json();
//     console.log(`Updated user data`, result);
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// }

// GET users cart
export async function fetchCart(token) {
  try {
    const response = await fetch(CART_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    // console.log("API: USER CART:", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// POST add to cart
export async function fetchAddToCart(token, productId, quantity) {
  try {
    const response = await fetch(CART_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    });
    const result = await response.json();
    // console.log("API: ADDED TO CART:", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// PATCH update an item from the cart
export async function fetchUpdateCart(token, productId, quantity) {
  try {
    const response = await fetch(CART_API_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    });
    const result = await response.json();
    // console.log("API: UPDATED ITEM IN CART:", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// DELETE a single item from the cart
export async function fetchRemoveFromCart(token, productId) {
  try {
    const response = await fetch(CART_API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    });
    const result = await response.json();
    // console.log("API: REMOVED FROM CART: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// DELETE entire users cart
export async function fetchRemoveCartAll(token) {
  try {
    const response = await fetch(CART_API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    // console.log("API: REMOVED ALL FROM CART: ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// ADMIN LOGIN
// POST
export async function fetchAdminLogin(username, password) {
  try {
    const response = await fetch(`${USERS_API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    // console.log("API: ADMIN LOGIN ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// GET Admin by id
export async function fetchAdminUser(token) {
  try {
    const response = await fetch(`${USERS_API_URL}/admin/account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    // console.log("API: ADMIN USER ", result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
