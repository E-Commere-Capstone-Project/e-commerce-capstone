import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, Heading } from "@chakra-ui/react";
import useShopUser from "./context/UserContext.jsx";
import { fetchAdminLogin } from "../API/index.js";
// import { fetchAdminLogin } from "../API";
export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const isEmpty = password === "";

  const { changeIsLoggedIn } = useShopUser();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await fetchAdminLogin(username, password);
    console.log(`Admin login user`, user);
    // onSetIsLoggedIn(true);
    setUsername("");
    setPassword("");
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    localStorage.setItem("userToken", JSON.stringify(user.userToken));
    changeIsLoggedIn(true);
    setTimeout(() => {
      navigate("/users/admin/account");
    }, 2000);
    console.log(user);
  }
  return (
    <form method="POST" onSubmit={handleSubmit} id="login-form">
      <Heading>Admin Sign In</Heading>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <button onClick={handleSubmit}>Log in</button>
    </form>
  );
}
