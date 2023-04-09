import mongoose from 'mongoose';
const { Schema } = mongoose;
const roomSchema = new Schema({

    title: {
        type: String,
        required: true,

    },
    price: {
        type: Number,
        required: true,

    },
    roomnumbers: [{ number: { type: Number }, unavailabledates: { type: [Date] } }],
    maxpeople: {
        type: Number,
        required: true,

    },
    desc: {
        type: String,
        required: true,

    },


});
export default mongoose.model("Room", roomSchema);