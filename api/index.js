import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'; // Include the extension
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import analyticsRouter from './routes/analytics.route.js'
import tourBookingRouter from './routes/tourBooking.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('MongoDB URI:', process.env.MONGO_STRING ? 'Found' : 'Not found');

mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
const app = express();
// const cors=require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter); // Ensure this is above app.listen
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter );
app.use('/api/analytics',analyticsRouter );
app.use('/api/tours',tourBookingRouter );
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/client','dist','index.html'))
);
app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
