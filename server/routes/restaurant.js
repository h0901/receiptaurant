const express = require("express");
const db = require("../db.js");
const Restaurant = require("../models/Restaurant.js");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Received request at /api/restaurant");
  const { name, location } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO Restaurant (name, location) VALUES (?, ?)",
      [name, location]
    );
    res
      .status(201)
      .json({ message: "Restaurant added", restaurantId: result.insertId });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ error: "Failed to add restaurant" });
  }
});

router.get("/", async (req, res) => {
  console.log("Received get request at /api/restaurant");
  try {
    const [restaurants] = await db.query(
      "SELECT Name, MIN(Restaurant_ID) AS res_id FROM Restaurant GROUP BY Name;"
    );
    console.log("Database query result:", restaurants);

    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res
      .status(500)
      .json({ error: "Error fetching restaurants", details: error.message });
  }
});

router.get('/:name/bills', async (req, res) => {
  const restaurantName = decodeURIComponent(req.params.name);

  const query = `
      SELECT b.Bill_Date, s.surcharge_name, s.surcharge_percent, s.surcharge_amount
      FROM Restaurant r
      JOIN Bill b ON r.Restaurant_ID = b.Restaurant_ID
      JOIN Surcharges s ON b.ID = s.bill_id
      WHERE r.Name = ?
  `;

  try {
      const results = await db.query(query, [restaurantName]);
      res.json(results);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
