import { useState } from "react";
import { fetchLogin } from "../API/index.js";
import { useNavigate, Link } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  useToast,
  Stack,
} from "@chakra-ui/react";
import useShopUser from "./context/UserContext.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const isEmpty = password === "";

  const toast = useToast();

  const { changeIsLoggedIn } = useShopUser();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await fetchLogin(username, password);
    // console.log(`login user`, user);
    // onSetIsLoggedIn(true);
    setUsername("");
    setPassword("");
    if (user.user) {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userToken", JSON.stringify(user.userToken));
      changeIsLoggedIn(true);
      toast({
        title: "Successful login",
        description:
          "You have successfully been logged in, we are redirecting you to your profile now",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setTimeout(() => {
        navigate("/users/profile");
      }, 2000);
    } else {
      toast({
        title: "Failed Login",
        description: "Username or Password incorrect",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }

  return (
    <section id="login-page">
      <form method="POST" onSubmit={handleSubmit} id="login-form">
        <Heading
          color="neutral.700"
          fontFamily="fonts.body"
          paddingBottom="1em"
        >
          Sign In
        </Heading>
        <FormControl isRequired>
          <FormLabel color="neutral.600">Username</FormLabel>
          <Input
            borderRadius="0"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />{" "}
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="neutral.600">Password</FormLabel>
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
          color="neutral.700"
        >
          <Text fontSize="1.2em">Don&apos;t have an account?</Text>
          <Link to="/users/register">
            <Text fontSize="1.2em" backgroundColor="#F0EAEC" padding=".25em">
              Sign up today
            </Text>
          </Link>
        </Stack>

        <button color="#532C38">Log in</button>
      </form>
    </section>
  );
}
