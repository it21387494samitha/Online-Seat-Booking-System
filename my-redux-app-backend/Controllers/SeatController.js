import Seat from "../Models/SeatModel.js";

// Get all seats
export const getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seats', error });
  }
};

// Book a seat
export const bookSeat = async (req, res) => {
  const { row, number } = req.body;
  const userId = req.user.id; // Assuming user ID is available from auth middleware

  try {
    const seat = await Seat.findOne({ row, number });

    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    if (seat.isBooked) {
      return res.status(400).json({ message: 'Seat is already booked' });
    }

    seat.isBooked = true;
    seat.bookedBy = userId;
    await seat.save();

    res.status(200).json({ message: 'Seat booked successfully', seat });
  } catch (error) {
    res.status(500).json({ message: 'Error booking seat', error });
  }
};

// Cancel a seat booking
export const cancelBooking = async (req, res) => {
  const { row, number } = req.body;
  const userId = req.user.id; // Assuming user ID is available from auth middleware

  try {
    const seat = await Seat.findOne({ row, number, bookedBy: userId });

    if (!seat) {
      return res.status(404).json({ message: 'Seat not found or not booked by this user' });
    }

    seat.isBooked = false;
    seat.bookedBy = null;
    await seat.save();

    res.status(200).json({ message: 'Booking cancelled successfully', seat });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error });
  }
};
