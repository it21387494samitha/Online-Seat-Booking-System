import FeedbackModel from "../Models/FeedbackModel.js";

export const CreateFeedback = async (req, res) => {
  const userId = req.user.id; // Assuming you're extracting the user ID from token middleware
  const { feedback } = req.body; // Extract feedback from request body

  try {
    // Create a new feedback instance
    const newFeedback = new FeedbackModel({
      feedback,
      givenBy: userId
    });

    // Save the feedback to the database
    await newFeedback.save();

    // Send a success response
    res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
};
