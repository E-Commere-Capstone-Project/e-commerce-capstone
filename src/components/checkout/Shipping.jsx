import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
// import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function Shipping({ onSetActiveStep, activeStep }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function checkIfError(input) {
    return input === "";
  }

  return (
    <div className="checkout-tabs">
      <Heading color="#532C38">Shipping Information</Heading>
      <form>
        <FormControl isRequired>
          <FormLabel color="#734C58">First Name</FormLabel>
          <Input
            borderRadius="0"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            // onBlur={() => {}}
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
          <FormLabel color="#734C58">Address</FormLabel>
          <Input
            borderRadius="0"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="#734C58">City</FormLabel>
          <Input
            borderRadius="0"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="#734C58">State</FormLabel>
          <Input
            borderRadius="0"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="#734C58">ZIP Code </FormLabel>
          <Input
            borderRadius="0"
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </FormControl>
        <div>
          <Heading marginTop="1em" color="#532C38">
            Contact Information
          </Heading>
          <FormControl isRequired>
            <FormLabel color="#734C58">Email Address</FormLabel>
            <Input
              borderRadius="0"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel optionalIndicator color="#734C58">
              Phone Number
            </FormLabel>
            <Input
              borderRadius="0"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* <PhoneInput
              value={phone}
              onChange={(e) => setPhone(Number(e.target.value))}
              defaultCountry="US"
              id="phone-input"
            /> */}
          </FormControl>
          <Button
            borderRadius="0"
            marginTop="1.2em"
            color="#532C38"
            fontSize="1.3em"
            onClick={() => {
              onSetActiveStep(activeStep + 1);
            }}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
