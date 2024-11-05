const express = require('express');
const db = require('../db.js')

const router = express.Router();

router.post('/', async (req, res) => {
  const { res_id, bill_id, surcharge_name, surcharge_percent, surcharge_amount } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO Surcharges (res_id, bill_id, surcharge_name, surcharge_percent, surcharge_amount) VALUES (?, ?, ?, ?, ?)',
      [res_id, bill_id, surcharge_name, surcharge_percent, surcharge_amount]
    );
    res.status(201).json({ message: 'Surcharge added', surchargeId: result.insertId });
  } catch (error) {
    console.error('Error adding surcharge:', error);
    res.status(500).json({ error: 'Failed to add surcharge' });
  }
});

module.exports = router;
