import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
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
    <section id="admin-login-page">
      <form method="POST" onSubmit={handleSubmit} id="login-form">
        <Heading color="#532C38">Admin Sign In</Heading>
        <FormControl isRequired>
          <FormLabel color="#734C58">Username</FormLabel>
          <Input
            borderRadius="0"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />{" "}
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="#734C58">Password</FormLabel>
          <Input
            borderRadius="0"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          marginTop="1em"
          color="#532C38"
          fontSize={"1.2em"}
          onClick={handleSubmit}
        >
          Log in
        </Button>
      </form>
    </section>
  );
}
