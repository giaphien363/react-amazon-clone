const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51J1ju6FvkgzTVA7aPNh8jBzcQLbuQ1poGcLHJSPQxAcyLne1W0IyP0dBpryRoG1UWVALCc655z5MS5sCvRxCFS6P006fz6axRY"
);

// api

// app config
const app = express();
// middleware
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());
// api route
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  console.log("total=>>>>", parseInt(total));
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(total), // subunits of currentcy
    currency: "usd",
  });

  // ok - create
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// listen command
exports.api = functions.https.onRequest(app);

// example end point
// http://localhost:5001/amazon-clone-react/us-central1/api
