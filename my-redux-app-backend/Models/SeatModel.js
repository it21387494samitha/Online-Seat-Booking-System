import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true,
        unique: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference the User model
        default: null
    }
});

const SeatModel = mongoose.model("seat", SeatSchema);

export default SeatModel;
