import express from 'express';
import bodyParser from 'body-parser';
import restaurantRoutes from './routes/restaurant.js';
import billRoutes from './routes/bill.js';
import surchargeRoutes from './routes/surcharges.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

app.use('/api/restaurant', restaurantRoutes);
app.use('/api/bill', billRoutes);
app.use('/api/surcharge', surchargeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




