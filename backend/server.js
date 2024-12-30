// server.js (or app.js)
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_d0uDNEq3eZ4bnW",   // Your Razorpay Key ID
  key_secret: "6qwXAK7LLxxrTbslHPvPMDZQ" // Your Razorpay Key Secret
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      payment_capture: 1, // Automatically capture payment
    });
    res.json({
      id: order.id,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
