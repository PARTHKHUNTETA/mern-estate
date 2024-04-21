import express from 'express';
import dotenv from 'dotenv'
import connectDB from './Config/db.js';
import cookieParser from 'cookie-parser';
import UserRouter from './routes/user.route.js'
import AuthRouter from './routes/auth.route.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
const app = express();

app.use(express.json());
app.use(cookieParser())
dotenv.config();

connectDB();

app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)

app.use(notFound);
app.use(errorHandler)

app.listen(3000, () => {
    console.log('listening on port 3000');
})