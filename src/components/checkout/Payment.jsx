import {
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Payment({ activeStep, onSetActiveStep }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [card, setCard] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");

  function checkIfError(input) {
    return input === "";
  }

  return (
    <div className="checkout-tabs">
      <Heading>Payment Information</Heading>
      <form>
        <div>
          <FormControl isRequired>
            <FormLabel>Credit or Debit Card Number</FormLabel>
            <Input
              type="text"
              value={card}
              onChange={(e) => setCard(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Exp. Date</FormLabel>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>CVV</FormLabel>
            <Input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </FormControl>
        </div>
        <Heading>Billing Address</Heading>
        <FormControl isInvalid={checkIfError(firstName)} isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            // onBlur={() => {}}
          />
        </FormControl>
        <FormControl isInvalid={checkIfError(lastName) && focus} isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>City</FormLabel>
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>State</FormLabel>
          <Input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>ZIP Code </FormLabel>
          <Input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </FormControl>
        <ButtonGroup>
          <Button
            onClick={() => {
              onSetActiveStep(activeStep - 1);
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              onSetActiveStep(activeStep + 1);
            }}
          >
            Next
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}
