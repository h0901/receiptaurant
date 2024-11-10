const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const restaurantRoutes = require("./routes/restaurant.js");
const billRoutes = require("./routes/bill.js");
const surchargeRoutes = require("./routes/surcharges.js");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://your-vercel-domain.vercel.app"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ fruits: ["apple", "banana", "orange"] });
});

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/bill", billRoutes);
app.use("/api/surcharge", surchargeRoutes);

module.exports = app;
