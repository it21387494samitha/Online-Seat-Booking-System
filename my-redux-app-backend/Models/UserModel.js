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
        unique: true
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
        required: true
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    }
});

 const UserModel= mongoose.model("User", userSchema);
export default UserModel;