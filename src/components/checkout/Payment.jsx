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

  return (
    <div className="checkout-tabs">
      <Heading color="#532C38">Payment Information</Heading>
      <form>
        <div>
          <FormControl isRequired>
            <FormLabel color="#734C58">Credit or Debit Card Number</FormLabel>
            <Input
              borderRadius="0"
              type="text"
              value={card}
              onChange={(e) => setCard(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="#734C58">Exp. Date</FormLabel>
            <Input
              borderRadius="0"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#734C58">CVV</FormLabel>
            <Input
              borderRadius="0"
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </FormControl>
        </div>
        <Heading color="#532C38">Billing Address</Heading>
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
        <ButtonGroup marginTop="1.2em" gap=".5em">
          <Button
            borderRadius="0"
            color="#532C38"
            fontSize="1.3em"
            onClick={() => {
              onSetActiveStep(activeStep - 1);
            }}
          >
            Back
          </Button>
          <Button
            borderRadius="0"
            color="#532C38"
            fontSize="1.3em"
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
