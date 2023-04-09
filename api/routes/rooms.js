import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js";
import Hotel from "../models/hotel.js";

import Room from "../models/room.js";
const router = express.Router();
//create room
router.post("/:id", async (req, res, next) => {
    const hotelId = req.params.id;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            });

        }
        catch (err) {
            next(err);

        }
        res.status(200).json(savedRoom);

    }
    catch (err) {
        next(err);

    }
});
//update
router.put("/:id", verifyAdmin, async (req, res, next) => {

    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateRoom)
    } catch (err) {
        return next(err);
    }
})

router.put("/avaibility/:id", async (req, res, next) => {

    try {
        await Room.updateOne({ "roomnumbers._id": req.params.id }, { $push: { "roomnumbers.$.unavailabledates": req.body.dates } });
        res.status(200).json("room updates")
    } catch (err) {
        return next(err);
    }
})
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });

        }
        catch (err) {
            next(err);

        }
        res.status(200).json("deleted Room")
    } catch (err) {
        return next(err);
    }
})


router.get("/:id", async (req, res, next) => {

    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room)
    } catch (err) {
        return next(err); //need to use return
    }
})


//get all
router.get("/", async (req, res, next) => {


    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (err) {
        return next(err);
    }
})
export default router;
