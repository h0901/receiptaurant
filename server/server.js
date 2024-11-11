const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const restaurantRoutes = require("./api/restaurant.js");
const billRoutes = require("./api/bill.js");
const surchargeRoutes = require("./api/surcharges.js");

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: ["http://localhost:5173", "https://cs484-final-project.vercel.app"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/restaurant", restaurantRoutes);
app.use("/api/bill", billRoutes);
app.use("/api/surcharge", surchargeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
