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
      "SELECT DISTINCT Name, Restaurant_ID AS res_id FROM Restaurant"
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

router.get("/:res_id/surcharges", async (req, res) => {
  const { res_id } = req.params;
  console.log(res_id);
  console.log(`Received GET request at /api/restaurant/${res_id}/surcharges`);

  try {
    const query = `
      SELECT s.sur_id, s.surcharge_name, s.surcharge_percent, s.surcharge_amount, b.bill_date
      FROM Surcharges s
      LEFT JOIN Bill b ON s.bill_id = b.id
      WHERE s.res_id = ?`;

    const surcharges = await db.query(query, [res_id]);
    console.log("Database query result:", surcharges);

    res.json(surcharges);
  } catch (error) {
    console.error("Error fetching surcharges:", error);
    res
      .status(500)
      .json({ error: "Error fetching surcharges", details: error.message });
  }
});

module.exports = router;
