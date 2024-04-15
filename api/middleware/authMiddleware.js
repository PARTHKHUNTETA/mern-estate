import Jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";


const protect = async (req, res, next) => {
    let token;

    // Get token from header if it exists
    token = req.cookies.access_token;

    if (token) {
        try {

            //decoding the jwt token to get the userId
            const decoded = Jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next()
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorized ,invalid token");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized ,no token");
    }
}


export { protect };