
import express from 'express';
import connectDB from './Config/db.js';
import dotenv from 'dotenv'
const app = express();

dotenv.config();

connectDB()
app.listen(3000, () => {
    console.log('listening on port 3000');
})