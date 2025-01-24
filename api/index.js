import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'; // Include the extension
import authRouter from './routes/auth.route.js'
import lisingRouter from './routes/listing.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
const __dirname = path.resolve();
const app = express();
// const cors=require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter); // Ensure this is above app.listen
app.use('/api/auth',authRouter);
app.use('/api/listing',lisingRouter );
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
