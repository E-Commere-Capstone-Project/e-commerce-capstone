import { useState } from "react";
import { fetchRegisterUser } from "../API/index.js";
import { Form, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  useToast,
  Heading,
} from "@chakra-ui/react";
// import useShopUser from "./context/UserContext.jsx";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const isEmpty = password === "";

  // const { changeIsLoggedIn } = useShopUser();

  const navigate = useNavigate();
  const toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    if (password === confirmPassword && password !== "") {
      const user = await fetchRegisterUser(
        username,
        password,
        firstName,
        lastName,
        telephone
      );
      // console.log(`JSX: New Registered User`, user);
      // onSetIsLoggedIn(true);
      setUsername("");
      setPassword("");
      setTimeout(() => {
        navigate("/users/login");
      }, 2000);
    } else {
      setErrorMessage("Password fields do not match.");
      handleErrorMessage();
    }
  }

  function handleErrorMessage() {
    toast({
      title: `Password Error`,
      description: `${errorMessage}`,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }

  return (
    <section id="register-page">
      <form method="POST" onSubmit={handleSubmit} id="register-form">
        <Heading color="#532C38">Register</Heading>
        <FormControl isRequired>
          <FormLabel color="#734C58">First Name</FormLabel>
          <Input
            borderRadius="0"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="#734C58">Last Name</FormLabel>
          <Input
            borderRadius="0"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="#734C58">Telephone</FormLabel>
          <Input
            borderRadius="0"
            type="tel"
            value={telephone}
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            maxLength={10}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="#734C58">Username</FormLabel>
          <Input
            borderRadius="0"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
        <FormControl isRequired>
          <FormLabel color="#734C58">Confirm Password</FormLabel>
          <Input
            type="password"
            borderRadius="0"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>

        <Button
          marginTop="1.2em"
          color="#532C38"
          fontSize="1.3em"
          borderRadius="0"
          onClick={() => (errorMessage ? handleErrorMessage() : handleSubmit())}
        >
          Register Now
        </Button>
      </form>
    </section>
  );
}

/*
  const usernameState;
  const passwordState;
  const confirmPasswordState;

  return (
    form to enter username and password in order to register 
    <form>
    <label>
    Username: 
     <input value={usernameState} onChange={(e)=>setUsernameState(e.target.value)}/>
    </label>
    <label>
    Password:
    <input value={passwordState} onChange={e => setPasswordState(e.target.value)}/>
    </label>
    <label>
    Confirm Password:
    <input value={confirmPasswordState} onChange={e => setConfirmPasswordState(e.target.value)}/>
    </label>
    <Check if password and confirm password match before allowing the user to be able to submit the form/>
    <Display an error message if the password and confirm password do not match/>
    <button>Register</button>
    </form>
  )
  */
