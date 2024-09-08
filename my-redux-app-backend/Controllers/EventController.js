import EventModel from "../Models/EventModel.js";
import UserModel from "../Models/UserModel.js";

// Create a new event (Admin only)
export const createEvent = async (req, res) => {
  try {
    // Check if the logged-in user is an admin
    const user = await UserModel.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Only admins can create events" });
    }

    const { eventName, eventDescription, eventDate, location } = req.body;

    // Validate input
    if (!eventName || !eventDescription || !eventDate || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the event
    const newEvent = new EventModel({
      eventName,
      eventDescription,
      eventDate,
      location,
      createdBy: req.user.id,  // Admin who created the event
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Error creating event", error });
  }
};

// Get all events (Public route)
export const getEvents = async (req, res) => {
  try {
    const events = await EventModel.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events", error });
  }
};
