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
  Stack,
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
        <Heading color="#532C38">Sign In</Heading>
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Stack
          flexFlow="row wrap"
          alignItems="center"
          padding="1em 0"
          color="#532C38"
        >
          <Text fontSize="1.2em">Don&apos;t have an account?</Text>
          <Link to="/users/register">
            <Text fontSize="1.2em" backgroundColor="#F0EAEC" padding=".25em">
              Sign up today
            </Text>
          </Link>
        </Stack>

        <Button color="#532C38" fontSize={"1.2em"} onClick={handleSubmit}>
          Log in
        </Button>
      </form>
    </section>
  );
}
