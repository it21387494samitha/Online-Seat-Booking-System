import SeatModel from '../Models/SeatModel.js';
import EventModel from '../Models/EventModel.js'; // If you have an event model



export const ReserveSeat = async (req, res) => {
    const { eventId, seatId } = req.params; // Use req.params instead of req.body
    const userId = req.user.id;

    try {
        // Check if the event exists
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Find the seat by seat ID and event
        const seat = await SeatModel.findOne({ _id: seatId, event: eventId });
        if (!seat) {
            return res.status(404).json({ message: 'Seat not found for this event' });
        }

        // Check if the seat is already reserved
        if (!seat.isAvailable) {
            return res.status(400).json({ message: 'Seat is already reserved' });
        }

        // Reserve the seat
        seat.isAvailable = false;
        seat.reservedBy = userId;
        await seat.save();
        



        res.status(200).json({ message: 'Seat reserved successfully', seat });
    } catch (error) {
        res.status(500).json({ message: 'Error reserving seat', error });
    }
};


export const CancelReservation = async (req, res) => {
    const { seatNumber, eventId } = req.body; 
    const userId = req.user.id;

    try {
        
        const seat = await SeatModel.findOne({ seatNumber, event: eventId });
        if (!seat) {
            return res.status(404).json({ message: 'Seat not found' });
        }

        
        if (seat.reservedBy.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to cancel this reservation' });
        }

      
        seat.isAvailable = true;
        seat.reservedBy = null;
        await seat.save();

        res.status(200).json({ message: 'Reservation canceled successfully', seat });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling reservation', error });
    }
};


export const ViewAvailableSeats = async (req, res) => {
    const { eventId } = req.params;

    try {
        
        const seats = await SeatModel.find({ event: eventId, isAvailable: true });
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving available seats', error });
    }
};

export const CreateSeat = async (req, res) => {
    const { seatNumber, eventId } = req.body;

    try {
      
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        
        const existingSeat = await SeatModel.findOne({ seatNumber, event: eventId });
        if (existingSeat) {
            return res.status(400).json({ message: 'Seat already exists for this event' });
        }

       
        const newSeat = new SeatModel({
            seatNumber,
            event: eventId,
            isAvailable: true
        });

        
        await newSeat.save();

        res.status(201).json({ message: 'Seat created successfully', seat: newSeat });
    } catch (error) {
        res.status(500).json({ message: 'Error creating seat', error });
    }
};




export const CreateSeatStructure = async (req, res) => {
    const { eventId, rows, columns } = req.body;

    try {
        // Check if the event exists
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        let seats = [];

        // Loop through rows and columns to generate seats
        for (let row of rows) {
            for (let col = 1; col <= columns; col++) {
                const seatNumber = `${row}${col}`;
                
                // Check if seat already exists for this event
                const existingSeat = await SeatModel.findOne({ seatNumber, event: eventId });
                if (existingSeat) {
                    return res.status(400).json({ message: `Seat ${seatNumber} already exists for this event` });
                }

                const newSeat = new SeatModel({
                    seatNumber,
                    row,
                    column: col,
                    event: eventId,
                    isAvailable: true // Default to available
                });
                
                seats.push(newSeat);
            }
        }

        // Save all seats at once
        await SeatModel.insertMany(seats);

        res.status(201).json({ message: 'Seats created successfully', seats });
    } catch (error) {
        res.status(500).json({ message: 'Error creating seats', error });
    }
};



// Get the count of booked seats for an event
export const GetBookedSeatCount = async (req, res) => {
    const { eventId } = req.params;

    try {
        // Count the number of seats that are reserved (isAvailable: false)
        const bookedSeatCount = await SeatModel.countDocuments({ event: eventId, isAvailable: false });

        res.status(200).json({ eventId, bookedSeatCount });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booked seat count', error });
    }
};



// SeatBookingController.js
export const GetBookingHistory = async (req, res) => {
    const userId = req.user.id; // Get the user's ID from the token

    try {
        // Find all seats reserved by this user
        const bookings = await SeatModel.find({ reservedBy: userId })
            .populate('event', 'name date') // Optionally populate event details
            .select('seatNumber event'); // Select fields to return

        if (!bookings.length) {
            return res.status(404).json({ message: 'No booking history found' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking history', error });
    }
};



export const deleteBooking = async (req, res) => {
    try {
      const bookingId = req.params.id;  // Get booking ID from URL parameters
      const seat = await SeatModel.findById(bookingId);
  
      if (!seat) {
        return res.status(404).json({ message: 'Seat reservation not found' });
      }
  
      // Reset the reservation status
      seat.isAvailable = true;
      seat.reservedBy = null;  // Clear the user who reserved it
      await seat.save();  // Save the changes to the seat document
  
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
