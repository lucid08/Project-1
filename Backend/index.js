// backend/server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import itemRouter from './routes/item.route.js';


dotenv.config()
const app = express();
const PORT = 5000;
connectDB()
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login Route
app.use('/api/v1/user', userRouter)
app.use('/api/v1/items', itemRouter)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
