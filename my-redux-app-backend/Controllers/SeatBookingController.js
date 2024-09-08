import SeatModel from "../Models/SeatModel.js";
// import UserModel from "../Models/UserModel.js";

// Book a seat
export function bookSeat(req, res) {
    const { seatNumber } = req.body;
    const userId = req.user.id; // Get user from token

    SeatModel.findOne({ seatNumber })
        .then(seat => {
            if (!seat) {
                return res.status(404).json({ message: "Seat not found" });
            }
            if (seat.isBooked) {
                return res.status(400).json({ message: "Seat already booked" });
            }

            // Update seat status
            seat.isBooked = true;
            seat.bookedBy = userId;

            seat.save()
                .then(() => res.status(200).json({ message: "Seat successfully booked", seat }))
                .catch(err => res.status(500).json({ message: "Error booking seat", error: err }));
        })
        .catch(err => res.status(500).json({ message: "Error finding seat", error: err }));
}

// Get all seats (with their booking status)
export function getSeats(req, res) {
    SeatModel.find()
        .then(seats => res.status(200).json(seats))
        .catch(err => res.status(500).json({ message: "Error fetching seats", error: err }));
}

// Cancel a seat booking
export function cancelBooking(req, res) {
    const { seatNumber } = req.body;
    const userId = req.user.id;

    SeatModel.findOne({ seatNumber })
        .then(seat => {
            if (!seat) {
                return res.status(404).json({ message: "Seat not found" });
            }
            if (!seat.isBooked || String(seat.bookedBy) !== String(userId)) {
                return res.status(400).json({ message: "You can't cancel this booking" });
            }

            // Update seat status
            seat.isBooked = false;
            seat.bookedBy = null;

            seat.save()
                .then(() => res.status(200).json({ message: "Booking cancelled successfully", seat }))
                .catch(err => res.status(500).json({ message: "Error cancelling booking", error: err }));
        })
        .catch(err => res.status(500).json({ message: "Error finding seat", error: err }));
}
