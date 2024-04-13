import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'

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

        const hashedPassword = bcryptjs.hashSync(password, 10)

        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json('User Created SuccessFully');
    } catch (err) {
        next(err)
    }
}