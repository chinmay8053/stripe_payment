import React from "react";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";

export default function CardPayment() {
  const stripePayment = loadStripe(
    "pk_test_51KhsKnSJ4B1kEgNuhb48p6mjauhuhnZASi6fepCPSl4v6yTm7Ue9JrMflsX72bSmzXBlzXfZTSoR0XnHQWxSUKnI00NmVOZg0b"
  );
  return (
    <div>
      <h2>Payment</h2>
      <form id="payment-form" className="flex-2-column">
        <label htmlFor="card-element">Card Details</label>
        <Elements stripe={stripePayment}>
          <CardElement id="card-element" />
        </Elements>
        <Button
          sx={{
            padding: "10px 40px",
            marginLeft: "5px",
            backgroundColor: "rgba(0,0,1,0.7)",
            "&:hover": {
              backgroundColor: "rgba(0,0,1,0.8)",
            },
          }}
          fullWidth
          variant="contained"
        >
          Pay ₹ 350
        </Button>
      </form>
    </div>
  );
}
