/*import express from 'express';
import bodyParser from 'body-parser';
import restaurantRoutes from './routes/restaurant.js';
import billRoutes from './routes/bill.js';
import surchargeRoutes from './routes/surcharges.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


app.use('/api/restaurant', restaurantRoutes);
app.use('/api/bill', billRoutes);
app.use('/api/surcharge', surchargeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});*/


const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const restaurantRoutes = require('./routes/restaurant.js');
const billRoutes = require('./routes/bill.js');
const surchargeRoutes = require('./routes/surcharges.js');

const app = express();
const PORT = 8080;
const corsOptions = {
  origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({"fruits": ["apple", "banana", "orange"]});                      
});

app.use('/api/restaurant', restaurantRoutes);
app.use('/api/bill', billRoutes);
app.use('/api/surcharge', surchargeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


