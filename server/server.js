const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const restaurantRoutes = require("./routes/restaurant.js");
const billRoutes = require("./routes/bill.js");
const surchargeRoutes = require("./routes/surcharges.js");
const s3UploadRoute = require("./routes/bucketupload.js");

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: [
    "https://receiptaurant-delta.vercel.app",
    "https://receiptaurant-server.vercel.app",
    "https://receiptaurant-images.s3.us-east-2.amazonaws.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/bill", billRoutes);
app.use("/api/surcharge", surchargeRoutes);
app.use("/api/s3Url", s3UploadRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
