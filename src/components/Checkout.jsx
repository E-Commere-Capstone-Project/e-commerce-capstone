import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import useShopUser from "./context/UserContext";
import Shipping from "./checkout/Shipping.jsx";
import Payment from "./checkout/Payment.jsx";
import ConfirmCheckout from "./checkout/ConfirmCheckout.jsx";

export default function Checkout() {
  const { isLoggedIn, cart } = useShopUser();
  // const [checkoutStep, setCheckoutStep] = useState(0);
  const steps = [
    { title: "Shipping" },
    { title: "Payment and Billing" },
    { title: "Review and Place Order" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <>
      <h2>Checkout</h2>
      <Stepper m="1em" p="1em" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
            </Box>
          </Step>
        ))}
      </Stepper>
      {/* 
        use a state to control component displayed
        as you step through the components it will update the displayed component and active step
        onClick={setStep(step +=1)}

      */}
      <div>
        {/* <p>{activeStep}</p> */}
        {activeStep === 0 && (
          <Shipping activeStep={activeStep} onSetActiveStep={setActiveStep} />
        )}
        {activeStep === 1 && (
          <Payment activeStep={activeStep} onSetActiveStep={setActiveStep} />
        )}
        {activeStep === 2 && (
          <ConfirmCheckout
            activeStep={activeStep}
            onSetActiveStep={setActiveStep}
          />
        )}
      </div>
    </>
  );
}
