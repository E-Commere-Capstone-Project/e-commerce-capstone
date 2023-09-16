import { useState } from "react";
import { fetchRegisterUser } from "../API/index.js";
import { Form, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
// import useShopUser from "./context/UserContext.jsx";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const isEmpty = password === "";

  // const { changeIsLoggedIn } = useShopUser();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await fetchRegisterUser(
      email,
      username,
      password,
      firstName,
      lastName
    );
    console.log(`New Registered User`, user);
    // onSetIsLoggedIn(true);
    setUsername("");
    setPassword("");
    setTimeout(() => {
      navigate("/users/login");
    }, 2000);
  }

  return (
    <form method="POST" onSubmit={handleSubmit} id="register-form">
      <FormControl isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl isInvalid={isEmpty}>
        <FormLabel>Password</FormLabel>
        <Input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isEmpty ? (
          ""
        ) : (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        )}
      </FormControl>

      <Button>Register Now</Button>
    </form>
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
