import express from "express"

import User from "../models/User.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();
//no need to create user because we have register function
// router.post("/", async (req, res, next) => {
//     const newUser = new User(req.body);
//     try {
//         const savedUser = await newUser.save();
//         res.status(200).json(savedUser)
//     } catch (err) {
//         return next(err);
//     }
// })


// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user,u are authenticated")
// })
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user,u are authenticated and u can delete ur account")
// })
// router.get("/checkadminr/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello admin,u are authenticated and u can delete any account")
// })



//update
router.put("/:id", verifyUser, async (req, res, next) => {

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateUser)
    } catch (err) {
        return next(err);
    }
})
//DELETE
router.delete("/:id", verifyUser, async (req, res, next) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted hotel")
    } catch (err) {
        return next(err);
    }
})


router.get("/:id", verifyUser, async (req, res, next) => {

    try {
        const user = await User.findById("346");
        res.status(200).json(user)
    } catch (err) {
        return next(err); //need to use return
    }
})


//get all
router.get("/", verifyAdmin, async (req, res, next) => {


    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        return next(err);
    }
})

export default router;