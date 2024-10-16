import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import validator from 'validator';


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
       
    },
    lastName: {
        type: String,
        
    },
    phone: {
        type: Number,
       
    },
    email: {
        type: String,
        required: true,
        unique: true
      },
      displayName: {
        type: String,
        
      },
      photoURL: {
        type: String
      },
    age: {
        type: String,
       
    },
    subscription: {  // Fixed typo
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,

    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String,
        unique: true
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
            },


         
            
        }, { timestamps: true });
;


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });


const UserModel = mongoose.model("User", userSchema);
export default UserModel;