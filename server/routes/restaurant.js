const express = require('express');
const db = require('../db.js')

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

module.exports = router;
