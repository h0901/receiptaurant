const express = require('express');
const db = require('../db.js');
const Restaurant = require('../models/Restaurant.js');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log("Received request at /api/restaurant");
  const { name, location } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO Restaurant (name, location) VALUES (?, ?)',
      [name, location]
    );
    res.status(201).json({ message: 'Restaurant added', restaurantId: result.insertId });
  } catch (error) {
    console.error('Error adding restaurant:', error);
    res.status(500).json({ error: 'Failed to add restaurant' });
  }
});

router.get('/', async (req, res) => {
  console.log("Received get request at /api/restaurant");
  try {
    const restaurants = await db.query(
      'SELECT DISTINCT Name FROM Restaurant'
    );
    console.log("Database query result:", restaurants);

    const restaurantData = Array.isArray(restaurants) ? restaurants[0] : [];
    res.json(restaurantData);
  }
  catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: 'Error fetching restaurants', details: error.message });
  }
});

module.exports = router;
