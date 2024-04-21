import Jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  
    // Get token from header if it exists
    const token = req.cookies.access_token;
    console.log(token)
    if (token) {
        try {

            //decoding the jwt token to get the userId
            const decoded = Jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = decoded
            next();
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