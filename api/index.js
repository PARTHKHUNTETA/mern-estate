import express from 'express';
import dotenv from 'dotenv'
import connectDB from './Config/db.js';
const app = express();

dotenv.config();

connectDB();

app.listen(3000, () => {
    console.log('listening on port 3000');
})