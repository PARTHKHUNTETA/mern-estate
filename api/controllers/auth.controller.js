import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import generateToken from '../utils/generateToken.js';


export const test = (req, res) => {
    res.json({ message: 'Hello From Auth Route!' })
}

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
        const hashedPassword = bcryptjs.hashSync(password, 10); // for encrypt the password
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json('User created successfully!');

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

        const validPassword = bcryptjs.compareSync(password, user.password) //for comparison of password
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

export const google = async (req, res, next) => {
    try {
        const { name, email, photo } = req.body;

        const user = await User.findOne({ email })

        if (user) {
            generateToken(res, user._id)
            const { password, ...rest } = user._doc;
            res.status(200).json(rest)
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);

        }


    } catch (err) {
        next(err)
    }
}

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
};