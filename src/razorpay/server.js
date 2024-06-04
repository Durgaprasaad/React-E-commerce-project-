// const express = require("express");
// const Razorpay = require("razorpay");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const crypto = require("crypto");

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const razorpay = new Razorpay({
//   key_id: "rzp_test_aAqbgOsB3SYfNx", // Replace with your Razorpay key_id
//   key_secret: "S85bHs9ne3cHkyOQRwurdh8l", // Replace with your Razorpay key_secret
// });

// app.post("/create-order", async (req, res) => {
//   const { amount, currency, receipt } = req.body;
//   try {
//     console.log("Creating order with amount:", amount);
//     const order = await razorpay.orders.create({ amount, currency, receipt });
//     res.json(order);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).send(error.message);
//   }
// });

// app.post("/verify-payment", (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const generated_signature = crypto
//     .createHmac("sha256", razorpay.key_secret)
//     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//     .digest("hex");

//   if (generated_signature === razorpay_signature) {
//     res.json({ status: "success" });
//   } else {
//     res.status(400).json({ status: "failure" });
//   }
// });

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });
