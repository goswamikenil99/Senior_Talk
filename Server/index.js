// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './middlewares/AuthMiddleware.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.DATABASE_URL;

app.use(cors({
    origin : [process.env.ORIGIN],
    methods : ["GET","POST","PUT","PATCH","DELETE"],
    credentials : true,
}));
app.use(cookieParser());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use("/api/auth",authRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
