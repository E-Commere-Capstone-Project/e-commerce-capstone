import { useState } from "react";
import { fetchLogin } from "../API/index.js";
import { useNavigate, Link } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import useShopUser from "./context/UserContext.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const isEmpty = password === "";

  const { changeIsLoggedIn } = useShopUser();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await fetchLogin(username, password);
    console.log(`login user`, user);
    // onSetIsLoggedIn(true);
    setUsername("");
    setPassword("");
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    localStorage.setItem("userToken", JSON.stringify(user.userToken));
    changeIsLoggedIn(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <section id="login-page">
      <form method="POST" onSubmit={handleSubmit} id="login-form">
        <Heading>Sign In</Heading>
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
        <Text>Don&apos;t have an account?</Text>
        <Link to="/users/register">Sign up today</Link>

        <button>Log in</button>
      </form>
    </section>
  );
}
