import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {  Elements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';
import "../Stripe.css"

import { selectOrderPlaced } from "../features/order/OrderSlice";
import OnlineForm from "./OnlineForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51PrzQkGviBdR7TVM0iUTpbtBrm63WUr2U9WflnJwYcFEMd6QOpemQOK02TP9Ndz5chzGSV0HDn2xfgdt6G9sn6C1005tSSfSJa");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectOrderPlaced)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount, orderId:currentOrder.id }),
    
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
         <OnlineForm/>
        </Elements>
      )}
    </div>
  );
}