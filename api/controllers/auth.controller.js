import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import generateToken from '../utils/generateToken.js';
import { userInfo } from 'os';

export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !password || !email) {  //checking if the fields are empty or not
            res.status(400)
            throw new Error("Please fill all the required details.");
        }
        else if (!username || !password) {
            res.status(400)
            throw new Error("Username and Password are required.");
        } else if (!email) {
            res.status(400)
            throw new Error("Email is required");
        } else if (await User.findOne({ email })) {
            res.status(409)
            throw new Error("This Email already exists!");
        } else if (await User.findOne({ username })) {
            res.status(409)
            throw new Error("This Username already exists!");
        }



    } catch (err) {
        next(err)
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!password || !email) {
            res.status(400)
            throw new Error("Please fill all the required details.");
        }

        const user = await User.findOne({ email })

        if (!user) {
            res.status(404)
            throw new Error("User not Found!");
        }

        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            res.status(401)
            throw new Error("Wrong Credentials")
        }
        generateToken(res, user._id);
        const { password: pass, ...userInfo } = user._doc;
        res.status(200).json(userInfo)
    } catch (err) {
        next(err)
    }
}