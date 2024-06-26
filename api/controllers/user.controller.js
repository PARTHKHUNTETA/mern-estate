import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
    res.json({ message: 'Hello From user Route!' })
}

export const updateUser = async (req, res, next) => {


    try {
        if (req.user.userId != req.params.id) {
            res.status(401);
            throw new Error('You are not authorized to perform this action');
        }
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar

                }
            }, { new: true }) // return the updated user data

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest)
    }
    catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {

    try {
        if (req.user.userId != req.params.id) {
            res.status(401);
            throw new Error('You are not authorized to perform this action');
        }

        await User.findByIdAndDelete(req.user.userId)
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted');
    }
    catch (err) {
        next(err);
    }
}

