// const express = require('express');
// const db = require('../db.js');

// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { restaurant_id, bill_image, bill_date } = req.body;

//   try {
//     const [result] = await db.query(
//       'INSERT INTO Bill (restaurant_id, bill_image, bill_date) VALUES (?, ?, ?)',
//       [restaurant_id, bill_image, bill_date]
//     );
//     res.status(201).json({ message: 'Bill added', billId: result.insertId });
//   } catch (error) {
//     console.error('Error adding bill:', error);
//     res.status(500).json({ error: 'Failed to add bill' });
//   }
// });

// module.exports = router;

const express = require("express");
const db = require("../db.js");
const cors = require("cors");

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "https://cs484-final-project.vercel.app"] }));
app.use(express.json());

app.post("/bill", async (req, res) => {
  const { restaurant_id, bill_image, bill_date } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO Bill (restaurant_id, bill_image, bill_date) VALUES (?, ?, ?)",
      [restaurant_id, bill_image, bill_date]
    );
    res.status(201).json({ message: "Bill added", billId: result.insertId });
  } catch (error) {
    console.error("Error adding bill:", error);
    res.status(500).json({ error: "Failed to add bill" });
  }
});

module.exports = app;
