import express from 'express';
import dotenv from 'dotenv'
import connectDB from './Config/db.js';
import UserRouter from './routes/user.route.js'
import AuthRouter from './routes/auth.route.js'
const app = express();

app.use(express.json());
dotenv.config();

connectDB();

app.use('/api/user/auth', AuthRouter)
app.use('/api/user', UserRouter)

app.listen(3000, () => {
    console.log('listening on port 3000');
})