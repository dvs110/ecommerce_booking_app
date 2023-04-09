import express from "express"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
const router = express.Router();


router.post("/register", async (req, res, next) => {
    // const newUser = new User(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
        // username: req.body.username,
        // email: req.body.email,
        ...req.body,
        password: hash// because we want to encode password
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
    } catch (err) {
        return next(err);
    }
})
router.post("/login", async (req, res, next) => {

    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "user not found"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "wrong password"))
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("accessToken", token, { //accessToken is the name of cookie and cookie stores token
            httpOnly: true,
        }).status(200).json({ details: { ...otherDetails }, isAdmin })
    } catch (err) {
        return next(err);
    }
})
export default router;