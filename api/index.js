// const express = require("express");
// const authRoute = require("./routes/auth.js");
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";
const app = express();





const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mondodb");
    } catch (error) {
        throw error;
    }
};
mongoose.connection.on('disconnected', () => { //if mongodb got disconnected
    console.log("mongodb disconnected");
});
// mongoose.connection.on('connected', () => {
//     console.log("mongodb connected");
// });


//MIDDLE WARES=>AS SOON AS USER MAKES API REQUEST PROGRAM CHECKS FOR ALL MIDDLEWARES ONE BY ONE WATCH LAMADEV 36:27

app.use(express.json());
app.use(cookieParser());
// app.use("/auth", authRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


//ERROR HANDLING MIDDLEWARE

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage
    });
})

app.listen(8000, function () {
    connect();
    console.log("connect to backend");
})