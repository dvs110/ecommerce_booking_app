import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js";
import Hotel from "../models/hotel.js";
import Room from "../models/room.js";
const router = express.Router();
//create
router.post("/", verifyAdmin, async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (err) {
        return next(err);
    }
})

//update
router.put("/:id", verifyAdmin, async (req, res, next) => {

    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateHotel)
    } catch (err) {
        return next(err);
    }
})
//DELETE
router.delete("/:id", verifyAdmin, async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("deleted hotel")
    } catch (err) {
        return next(err);
    }
})
//get

// router.get("/:id", async (req, res) => {

//     try {
//         const hotel = await Hotel.findById(req.params.id);
//         res.status(200).json(hotel)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

router.get("/find/:id", async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    } catch (err) {
        return next(err); //need to use return
    }
})


//get all
router.get("/", async (req, res, next) => {
    const { minprice, maxprice, ...other_details_in_query } = req.query //inorder to get minimum and maximum price from query

    try {
        // const hotels = await Hotel.find(req.query);
        const hotels = await Hotel.find({ ...other_details_in_query, cheapestPrice: { $gt: minprice | 1, $lt: maxprice || 999 } });

        res.status(200).json(hotels)
    } catch (err) {
        return next(err);
    }
})

router.get("/countByCity", async (req, res, next) => {

    const cities = req.query.cities.split(",")//converting them inti array
    try {
        const list = await Promise.all(cities.map(city => { //Promise.all used for iterable data
            return Hotel.countDocuments({ city: city })//counting number of hotels in city
        }))

        res.status(200).json(list)
    } catch (err) {
        return next(err);
    }
})

router.get("/countByType", async (req, res, next) => {

    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });

    const resortCount = await Hotel.countDocuments({ type: "resort" });

    const villaCount = await Hotel.countDocuments({ type: "villa" });

    const cabinCount = await Hotel.countDocuments({ type: "cabin" });


    try {


        res.status(200).json([{ type: "hotel", count: hotelCount },
        { type: "apartment", count: apartmentCount },
        { type: "resort", count: resortCount },
        { type: "villa", count: villaCount },
        { type: "cabin", count: cabinCount }])
    } catch (err) {
        return next(err);
    }
})

router.get("/room/:id", async (req, res, next) => {


    try {

        const hotel = await Hotel.findById(req.params.id);

        const list = await Promise.all(hotel.rooms.map(room => { //Promise.all used for iterable data
            return Room.findById(room)

        }))
        res.status(200).json(list)
    } catch (err) {
        return next(err);
    }
})
export default router;