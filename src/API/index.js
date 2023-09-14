// USE for writing all the api calls
const API_URL = "https://fakestoreapi.com";
const PRODUCTS_API_URL = `${API_URL}/products`;
const LOGIN_API_URL = `${API_URL}/auth/login`;
const USERS_API_URL = `${API_URL}/users`;

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

// POST User login
export async function fetchLogin(username, password) {
  const validUsername = "mor_2314";
  const validPassword = "83r5^_";
  try {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: validUsername,
        password: validPassword,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(`Logged in user`, error);
  }
}

// POST register a new user
export async function fetchRegister(
  email,
  username,
  password,
  firstName,
  lastName
) {
  try {
    const response = await fetch(USERS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        name: {
          firstName: firstName,
          lastName: lastName,
        },
      }),
    });
    const result = await response.json();
    console.log(`New registered user`, result);
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
    console.log(`User deleted`, result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// PATCH edit a users data
export async function fetchUpdateUser(
  userId,
  token,
  email,
  username,
  password,
  firstName,
  lastName,
  phone
) {
  try {
    const response = await fetch(`${USERS_API_URL}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        name: {
          firstName: firstName,
          lastName: lastName,
        },
        phone: phone,
      }),
    });
    const result = await response.json();
    console.log(`Updated user data`, result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
