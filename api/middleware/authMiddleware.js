import Jwt from "jsonwebtoken";
import { errorHandle } from "../utils/error.js";

const protect = (req, res, next) => {

    // Get token from header if it exists
    const token = req.cookies.access_token;
    if (token) {
        try {
            const decoded = Jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded
            next();
        }
        catch (error) {
            next(errorHandle(401, "Not authorized ,invalid token"))
        }
    } else {
        next(errorHandle(401, " You are not authorized, no token"))
    }
}


export { protect };