import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    age: {
        type: String,
        required: true
    },
    subscription: {  // Fixed typo
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },

    profileImage: {
        data: Buffer,      // Stores image data as a buffer
        contentType: String // Stores image file type (e.g., 'image/jpeg', 'image/png')
      },
      isDeleted:{
        type:  Boolean,
        default: false
    }
});

 const UserModel= mongoose.model("User", userSchema);
export default UserModel;