import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
    seatNumber: {
        type: String,
        required: true,
        unique: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    reservedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        default: null
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', // Assuming you have an Event model
        required: true
    }
});

const SeatModel = mongoose.model('Seat', seatSchema);
export default SeatModel;
