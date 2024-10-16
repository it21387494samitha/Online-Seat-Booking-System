import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import validator from 'validator';


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
        type: String, required: true, unique: true, validate: [validator.isEmail, 'Invalid email']
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
    googleId: {
        type: String

    },

    profileImage: {
        data: Buffer,      // Stores image data as a buffer
        contentType: String // Stores image file type (e.g., 'image/jpeg', 'image/png')
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

    isVerified: {
         type: Boolean,
          default: false },

    verificationToken: {
         type: String
         },


         role: {
             type: String,
              enum: ['user', 'admin'],
               default: 'user' 
            }
});


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });


const UserModel = mongoose.model("User", userSchema);
export default UserModel;