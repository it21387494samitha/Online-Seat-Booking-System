import SeatModel from '../Models/SeatModel.js';
import EventModel from '../Models/EventModel.js'; // If you have an event model

// Reserve a seat
export const ReserveSeat = async (req, res) => {
    const { seatNumber, eventId } = req.body;
    const userId = req.user.id;

    try {
        // Check if the event exists
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Find the seat by seat number and event
        const seat = await SeatModel.findOne({ seatNumber, event: eventId });
        if (!seat) {
            return res.status(404).json({ message: 'Seat not found' });
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

// Cancel a reservation
export const CancelReservation = async (req, res) => {
    const { seatNumber, eventId } = req.body; 
    const userId = req.user.id;

    try {
        // Find the seat by seat number and event
        const seat = await SeatModel.findOne({ seatNumber, event: eventId });
        if (!seat) {
            return res.status(404).json({ message: 'Seat not found' });
        }

        // Check if the seat is reserved by the current user
        if (seat.reservedBy.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized to cancel this reservation' });
        }

        // Cancel the reservation
        seat.isAvailable = true;
        seat.reservedBy = null;
        await seat.save();

        res.status(200).json({ message: 'Reservation canceled successfully', seat });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling reservation', error });
    }
};

// View available seats for an event
export const ViewAvailableSeats = async (req, res) => {
    const { eventId } = req.params;

    try {
        // Find all available seats for the event
        const seats = await SeatModel.find({ event: eventId, isAvailable: true });
        res.status(200).json(seats);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving available seats', error });
    }
};

export const CreateSeat = async (req, res) => {
    const { seatNumber, eventId } = req.body;

    try {
        // Check if the event exists
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the seat number already exists for this event
        const existingSeat = await SeatModel.findOne({ seatNumber, event: eventId });
        if (existingSeat) {
            return res.status(400).json({ message: 'Seat already exists for this event' });
        }

        // Create a new seat
        const newSeat = new SeatModel({
            seatNumber,
            event: eventId,
            isAvailable: true // Default to available
        });

        // Save the new seat
        await newSeat.save();

        res.status(201).json({ message: 'Seat created successfully', seat: newSeat });
    } catch (error) {
        res.status(500).json({ message: 'Error creating seat', error });
    }
};



 // If you have an event model

// Create seats in bulk
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
