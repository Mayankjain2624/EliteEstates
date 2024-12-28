import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'; // Include the extension
import authRouter from './routes/auth.route.js'
dotenv.config();

mongoose
  .connect(process.env.MONGO_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = express();
app.use(express.json());
app.use('/api/user', userRouter); // Ensure this is above app.listen
app.use('/api/auth',authRouter);


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
